const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

// Text index for search
bookSchema.index({ title: "text", author: "text" });

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

module.exports = { Book };
