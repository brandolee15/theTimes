const { post } = require("../api/controllers/posts");

const postsContainer = document.getElementById('posts')

function endpoint(path) {
    path = path || '';
    return 'http://localhost:8080/' + path;
};

function post(url, json) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

function renderPost(post){
    const li = document.createElement('li');
    li.setAttribute('id', 'post-'+post.id);
    const text = document.createTextNode(post.text);
}

function appendPost(post) {
    postsContainer.appendChild(renderPost(post));
};

function renderRoot(data) {
    data.posts.forEach(appendPost);
}

function createPost(text) {
    post(endpoint(), {text: text})
        .then(response => response.json())
        .then(appendPost);
}

var enter = document.getElementById('entry-form');
if(enter){
    enter.addEventListener('submit', function(event) {
        event.preventDefault();
        const textarea = document.getElementById('post-textbox');
        const text = textarea.value;
        textarea.value = '';
        createPost(text);
    });
}