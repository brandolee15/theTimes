DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL, 
    post VARCHAR(1000)
);