const { triggerAsyncId } = require("async_hooks");
const Book = require("../../models/Book");

const books = [{
    title: 'Make It Stick: The Science of Successful Learning',
    author: 'Peter Brown',
    isbn: '978-0674729018',
    pages: 336,
    edition: 1,
    is_paperback: false
  },
  {
    title: 'Essential Scrum: A Practical Guide to the Most Popular Agile Process',
    author: 'Kenneth Rubin',
    isbn: '978-0137043293',
    pages: 500,
    edition: 1,
    is_paperback: true
  },
  {
    title: "White Fragility: Why It's So Hard for White People to Talk About Racism",
    author: 'Robin DiAngelo',
    isbn: '978-0807047415',
    pages: 192,
    edition: 2,
    is_paperback: true
  },
  {
    title: 'The Pragmatic Programmer: Your Journey To Mastery',
    author: 'David Thomas',
    isbn: '978-0135957059',
    pages: 352,
    edition: 2,
    is_paperback: false
  },
  {
    title: 'The Art of Computer Programming, Vol. 1: Fundamental Algorithms',
    author: 'Donald Knuth',
    isbn: '978-0201896831',
    pages: 672,
    edition: 3,
    is_paperback: false
  },
  {
    title: 'Algorithms of Oppression: How Search Engines Reinforce Racism',
    author: 'Safiya Umoja Noble',
    isbn: '978-1479837243',
    pages: 256,
    edition: 1,
    is_paperback: true
  }]

const getBooks = async(req, res) => {
    try {
        const books = await Book.findAll();
    
         return  res.json(books);
    } catch (error) {
        console.log(`[ERROR]: failed to get books | ${ error.message}`);
       return  res.status(500).json({success: false, error: error.message});
    }
  }

  const getPaperbacks = (req, res) => {
    try {
        const books = await Book.findAll({
            where: {
                is_paperback: true
              },
              order: ['title'],
              attributes: {
                exclude: ['is_paperback', 'edition']
              }
        });
         return  res.json(books);
    } catch (error) {
        console.log(`[ERROR]: failed to get paperback books | ${ error.message}`);
       return  res.status(500).json({success: false, error: error.message});
    }
  }

  const getBookById = (req, res) => {

    try {
        const book = Book.findByPk(req.params.id);
        if (book) {
             return res.json(book);
        }
        return res.status(404).json({ success: false, message: "book does not exist"})
    } catch (error) {
        console.log(`[ERROR]: failed to get book by id | ${ error.message}`);
       return  res.status(500).json({success: false, error: error.message});
    }
  }

  const createBook = async (req, res) => {

    try {
    const book = req.body;

    const newBook = await Book.create(req.body)
    
      return res.json(newBook);

    } catch (error) {
        console.log(`[ERROR]: failed to create book | ${ error.message}`);
       return  res.status(500).json({success: false, error: error.message});
    }
  }

  const seedBooks = (req, res) => {
    
    try {
        await Book.bulkCreate(books)
      
        res.send({ success: true });
    } catch (error) {
        console.log(`[ERROR]: failed to seed Db | ${ error.message}`);
       return  res.status(500).json({success: false, error: error.message});
    }
  
  }
  module.exports = {
    getBooks,
    getPaperbacks,
    getBookById,
    createBook,
    seedBooks
  }