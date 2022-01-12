const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books')

router.get('/', booksController.index)
router.get('/:id', booksController.show)
router.post('/', booksController.create)

module.exports = router;