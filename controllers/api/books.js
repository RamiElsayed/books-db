const Book = require("../../models/Book");


const getBooks = (req, res) => {
    // TODO: Add a comment describing the functionality of this method
    Book.findAll().then((bookData) => {
      res.json(bookData);
    });
  }

  const getPaperbacks = (req, res) => {
    Book.findAll({
      // TODO: Add a comment describing the functionality of this property
      order: ['title'],
      // TODO: Add a comment describing the functionality of this property
      where: {
        is_paperback: true
      },
      attributes: {
        // TODO: Add a comment describing the functionality of this property
        exclude: ['is_paperback', 'edition']
      }
    }).then((bookData) => {
      res.json(bookData);
    });
  }

  const getBookById = (req, res) => {
    // TODO: Add a comment describing the functionality of this method
    Book.findByPk(req.params.id).then((bookData) => {
      res.json(bookData);
    });
  }

  const createBook = (req, res) => {
    Book.create(req.body)
      .then((newBook) => {
        res.json(newBook);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  module.exports = {
    getBooks,
    getPaperbacks,
    getBookById,
    createBook,
  }