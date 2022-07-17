const { Router } = require("express");

const router = Router();
const {
  getBooks,
  getPaperbacks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById
} = require("../../controllers/api/books");

router.get("/", getBooks);

router.get("/paperbacks", getPaperbacks);

router.get("/:id", getBookById);

router.post("/", createBook);

router.put("/:id", updateBookById);

router.delete("/:id", deleteBookById);

module.exports = router;
