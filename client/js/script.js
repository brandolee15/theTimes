// const { post } = require("../../api/controllers/posts");


// const postsContainer = document.getElementById('posts')

// function endpoint(path) {
//     path = path || '';
//     return 'http://localhost:3000/' + path;
// };

// function newPost(url, json) {
//     return fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(json),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     });
// };

// function renderPost(post){
//     const li = document.createElement('li');
//     li.setAttribute('id', 'post-'+post.id);
//     const text = document.createTextNode(post.text);
// }

// function appendPost(post) {
//     postsContainer.appendChild(renderPost(post));
// };

// function renderRoot(data) {
//     data.posts.forEach(appendPost);
// }

// function createPost(text) {
//     newPost(endpoint(), {text: text})
//         .then(response => response.json())
//         .then(appendPost);
// }

// var enter = document.getElementById('publishForm');
// if(enter){
//     enter.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const textarea = document.getElementById('postStory');
//         const text = textarea.value;
//         textarea.value = '';
//         createPost(text);
//     });
// }

const main = document.querySelector('main');

async function loadIndexFor(category){
    modal.style.display = 'none';
    const data = await getAll(category);
    data.forEach(p => renderPost(p, category));
}

function renderPost(data, category){
    let post = document.createElement('div');
    post.className = 'post';
    link.href = `#${category}/${data.id}`
    link.appendChild(post);
    main.appendChild(link);
}