const mongoose = require("mongoose");
const { Book } = require("../models/Book");

// GET /api/books — list all books, with optional ?search= and ?category= filters
async function listBooks(req, res) {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (category && category.trim()) {
      filter.category = category.trim();
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [{ title: regex }, { author: regex }];
    }

    const books = await Book.find(filter).sort({ createdAt: -1 }).lean();
    res.json(books);
  } catch (err) {
    console.error("Error listing books:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
}

// GET /api/books/stats — total books, total categories, average price
async function getBookStats(req, res) {
  try {
    const [totalBooks, categoriesResult, priceResult] = await Promise.all([
      Book.countDocuments(),
      Book.distinct("category"),
      Book.aggregate([{ $group: { _id: null, avg: { $avg: "$price" } } }]),
    ]);

    const averagePrice =
      priceResult.length > 0 ? Math.round(priceResult[0].avg * 100) / 100 : 0;

    res.json({
      totalBooks,
      totalCategories: categoriesResult.length,
      averagePrice,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
}

// GET /api/books/:id — get a single book by ID
async function getBook(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: "Book not found" });
    }

    const book = await Book.findById(id).lean();
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ error: "Failed to fetch book" });
  }
}

// POST /api/books — add a new book (admin only)
async function createBook(req, res) {
  try {
    const { title, author, category, price, rating, description, image } =
      req.body;

    if (
      !title ||
      !author ||
      !category ||
      price === undefined ||
      rating === undefined ||
      !description ||
      !image
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const book = await Book.create({
      title,
      author,
      category,
      price,
      rating,
      description,
      image,
    });

    res.status(201).json(book);
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ error: "Failed to create book" });
  }
}

// PUT /api/books/:id — update a book (admin only)
async function updateBook(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: "Book not found" });
    }

    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Failed to update book" });
  }
}

// DELETE /api/books/:id — delete a book (admin only)
async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: "Book not found" });
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
}

module.exports = {
  listBooks,
  getBookStats,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
