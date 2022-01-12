const db = require('../db/init');

class Post {
    constructor(data, post){
        this.id = data.id;
        this.title = data.title;
        this.name = data.name;
        this.post = data.post
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const postsData = await db.query(`SELECT * FROM posts;`);
                const posts = postsData.rows.map(p => new Post(p));
                resolve (posts);
            } catch (err) {
                reject('Post not found');
            }
        });    
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`SELECT * FROM posts ON id = $1`, [ id ]);
                let post = new Post(postData.rows[0]);
                resolve(post);
            } catch (err) {
                reject('Post could not be found')
            }
        });
    };

    static create(postData){
        return new Promise (async (resolve, reject) => {
            try{
              const { title, name, post } = postData;
              const newPost = await db.query(`INSER INTO posts (title, name, post) VALUES ($1, $2, $3) RETURNING *;`, [ titel, name, post])
              let post = new Post(newPost.rows[0]);
              resolve (post);   
            } catch (err) {
                reject('Post could not be created');
            }
        })
    }
};

module.exports = Post