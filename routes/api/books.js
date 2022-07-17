const { Router } = require("express");

const router = Router();
const {
  getBooks,
  getPaperbacks,
  getBookById,
  createBook,
  seedBooks,
  updateBookById,
  deleteBookById
} = require("../../controllers/api/books");

router.get("/", getBooks);

router.get("/paperbacks", getPaperbacks);

router.get("/:id", getBookById);

// CREATE a book
router.post("/", createBook);

// CREATE multiple books
router.post("/seed", seedBooks);

router.put("/:id", updateBookById);

router.delete("/:id", deleteBookById);

module.exports = router;
