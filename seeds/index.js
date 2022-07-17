const connection = require("../config/connection");

const Book = require("../models/Book");
const Library = require("../models/Library");

const books = require("./books.json");
const libraries = require("./libraries.json");

const seedDatabase = async() => {
  try {
    await connection.sync({ force: true });

    await Book.bulkCreate(books);

    console.log("[INFO]: Successfully seeded books in DB");

    await Library.bulkCreate(libraries);

    console.log("[INFO]: Successfully seeded libraries in DB");

    process.exit(0);
    
  } catch (error) {
    console.log(`[ERROR]: Database seed failed" | ${ error.message }`);
  }
};

seedDatabase();
