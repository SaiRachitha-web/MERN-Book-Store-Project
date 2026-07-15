require("dotenv").config();
const { connectDB } = require("./config/db");
const { Book } = require("./models/Book");

const sampleBooks = [
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    category: "Fantasy",
    price: 14.99,
    rating: 4.8,
    description:
      "A legendary figure tells the true story of his life: how he was driven from his home, made his way through a dangerous world, and became one of the most notorious magicians in history.",
    image: "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    price: 16.99,
    rating: 4.9,
    description:
      "A revolutionary system to get 1% better every day. Learn how to build good habits, break bad ones, and get remarkable results by making tiny changes that compound over time.",
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    price: 39.99,
    rating: 4.7,
    description:
      "A handbook of agile software craftsmanship filled with best practices and wisdom for writing clean, readable, maintainable code that every professional developer should read.",
    image: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Science",
    price: 18.99,
    rating: 4.8,
    description:
      "A bold, wide-ranging history of humankind from the Stone Age to the present day, exploring how biology and history have defined us and enhanced our understanding of what it means to be human.",
    image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    price: 9.99,
    rating: 4.5,
    description:
      "Set in the Jazz Age on Long Island, this novel depicts narrator Nick Carraway's interactions with the mysterious millionaire Jay Gatsby and Gatsby's obsession with the beautiful Daisy Buchanan.",
    image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
  },
  {
    title: "Elon Musk",
    author: "Walter Isaacson",
    category: "Biography",
    price: 27.99,
    rating: 4.6,
    description:
      "The inside story of the most fascinating and controversial innovator of our era: a man who aspires to save our planet and get us a new one to inhabit. A riveting biography by the author of Steve Jobs.",
    image: "https://covers.openlibrary.org/b/isbn/9781982181284-L.jpg",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    price: 12.99,
    rating: 4.9,
    description:
      "The boy who lived. Harry Potter has never even heard of Hogwarts when the letters start dropping through the letter box at number four, Privet Drive. Addressed in green ink, they describe a magical world.",
    image: "https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    category: "Programming",
    price: 44.99,
    rating: 4.7,
    description:
      "Your journey to mastery. Cuts through the increasing specialization and technicalities of modern software development to examine the core process—taking a requirement and producing working, maintainable code.",
    image: "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    price: 11.99,
    rating: 4.8,
    description:
      "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. A gripping, heart-wrenching account of racial injustice and the loss of innocence.",
    image: "https://covers.openlibrary.org/b/isbn/9780061935466-L.jpg",
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "Self Help",
    price: 13.99,
    rating: 4.5,
    description:
      "A guide to spiritual enlightenment that encourages readers to live in the present moment and detach from the ego-driven mind. One of the most transformative books in recent publishing history.",
    image: "https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg",
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    price: 15.99,
    rating: 4.7,
    description:
      "From the Big Bang to black holes, Stephen Hawking transforms the most complex scientific concepts into language anyone can understand. A landmark in scientific writing and a worldwide bestseller.",
    image: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    price: 22.99,
    rating: 4.6,
    description:
      "Based on more than forty interviews with Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues—this is the authoritative biography.",
    image: "https://covers.openlibrary.org/b/isbn/9781501127625-L.jpg",
  },
];

async function seedBooks() {
  const count = await Book.countDocuments();
  if (count > 0) {
    console.log(`Books already seeded (${count} found), skipping`);
    return;
  }

  await Book.insertMany(sampleBooks);
  console.log(`Seeded ${sampleBooks.length} sample books`);
}

// Allow running directly: npm run seed
if (require.main === module) {
  connectDB()
    .then(seedBooks)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Seeding failed:", err);
      process.exit(1);
    });
}

module.exports = { seedBooks };
