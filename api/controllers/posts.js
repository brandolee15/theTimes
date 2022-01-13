const Post = require('../models/Post.js');

//Post index route
async function index (req, res) {
    try {
        const posts = await Post.all
        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({err})
    }
}

//Post show route 
async function show (req, res) {
    try { 
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({err})
    }
}

//Post create route
async function create (req, res) {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post)
    } catch (err) {
        res.status(422).json({err})
    }
}

module.exports = { index, show, create }