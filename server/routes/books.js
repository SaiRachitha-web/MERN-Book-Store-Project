const express = require("express");
const router = express.Router();
const {
  listBooks,
  getBookStats,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { requireAdmin } = require("../middleware/auth");

router.get("/", listBooks);
router.get("/stats", getBookStats);
router.get("/:id", getBook);
router.post("/", requireAdmin, createBook);
router.put("/:id", requireAdmin, updateBook);
router.delete("/:id", requireAdmin, deleteBook);

module.exports = router;
