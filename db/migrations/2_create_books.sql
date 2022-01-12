DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id serial PRIMARY KEY,
    title,
    year_of_publication,
    abstract,
    author_id int
);