const { triggerAsyncId } = require("async_hooks");
const Book = require("../../models/Book");


const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    return res.json(books);
  } catch (error) {
    console.log(`[ERROR]: failed to get books | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getPaperbacks = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: {
        is_paperback: true,
      },
      order: ["title"],
      attributes: {
        exclude: ["is_paperback", "edition"],
      },
    });
    return res.json(books);
  } catch (error) {
    console.log(`[ERROR]: failed to get paperback books | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      return res.json(book);
    }
    return res
      .status(404)
      .json({ success: false, message: "book does not exist" });
  } catch (error) {
    console.log(`[ERROR]: failed to get book by id | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ["title", "author", "isbn", "pages", "edition", "is_paperback"],
      req.body
    );

    if (Object.keys(payload).length !== 3) {
      return res
        .status(400)
        .json({ message: "Please provide a valid request" });
    }

    await Book.create(payload);

    return res.json({ message: "Successfully created user" });
  } catch (error) {
    console.log(`[ERROR]: failed to create book | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateBookById = async (req, res) => {
  try {
    const payload = cleanUpPayload(req.body);

    if (Object.keys(payload).length) {
      await Book.update(payload, {
        where: {
          book_id: req.params.id,
        },
      });

      return res.json({ success: true });
    }
    return res
      .status(400)
      .json({ success: false, error: "Please provide a valid payload" });
  } catch (error) {
    console.log(`[ERROR]: failed to update book | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};
const deleteBookById = async (req, res) => {
  try {
    await Book.destroy({
      where: {
        book_id: req.params.id,
      },
    });
    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: failed to delete book | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = {
  getBooks,
  getPaperbacks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
