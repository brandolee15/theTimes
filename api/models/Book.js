const db = require('../dbConfig/init');

const Author = require('./Author');

module.exports = class Book {
    constructor(data, author){
        this.id = data.id;
        this.title = data.title;
        this.yearOfPublication = data.year_of_publication;
        this.abstract = data.abstract;
        this.author = { name: data.author_name, path: `/authors/${data.author_id}`};
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let bookData = await db.query('SELECT id, author_id FROM books');
                let books = bookData.rows.map(b => new Book(b));
                resolve (books);
            } catch (err) {
                reject('Book not found');
            }
        });
    };

    
    
    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let bookData = await db.query(`SELECT books.*, authors.name as author_name
                                                    FROM books 
                                                    JOIN authors
                                                    WHERE books.id = $1;`, [ id ]);
                let book = new Book(bookData.rows[0]);
                resolve (book);
            } catch (err) {
                reject('Book not found');
            }
        });
    };
    
    static async create(bookData){
        return new Promise (async (resolve, reject) => {
            try {
                const { title, yearOfPublication, abstract, authorName} = bookData;
                let author = await Author.findOrCreateByName(authorName);
                resolve (result.rows[0]);
            } catch (err) {
                reject('Book could not be created');
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DESTROY FROM books WHERE id = $1 RETURNING author_id', [ this.id ]);
                const author = await Author.findById(result.rows[0].author_id);
                const books = await author.books;
                if(!books.length){await author.destroy()}
                resolve('Book was deleted')
            } catch (err) {
                reject('Book could not be deleted')
            }
        })
    };
};