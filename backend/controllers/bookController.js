const Book = require("../models/Book");
const Issue = require("../models/Issue");

/* ================= ADD BOOK ================= */
exports.addBook = async (req, res) => {
  try {
    const { bookId, title, author } = req.body;
    const book = await Book.create({ bookId, title, author });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error adding book" });
  }
};

/* ================= GET BOOKS (LIMIT 10) ================= */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

/* ================= SEARCH BOOK ================= */
exports.searchBook = async (req, res) => {
  try {
    const q = req.query.q;

    const books = await Book.find({
      $or: [
        { bookId: { $regex: q, $options: "i" } },
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
      ],
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error searching books" });
  }
};

/* ================= ISSUE BOOK ================= */
exports.issueBook = async (req, res) => {
  try {
    const { bookId, studentId, studentName } = req.body;

    const book = await Book.findOne({ bookId });
    if (!book || book.isIssued) {
      return res.status(400).json({ message: "Book not available" });
    }

    book.isIssued = true;
    book.issuedTo = studentId;
    book.issueDate = new Date();
    await book.save();

    await Issue.create({ bookId, studentId, studentName });

    res.json({ message: "Book issued successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error issuing book" });
  }
};

/* ================= RETURN BOOK ================= */
exports.returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findOne({ bookId });
    if (!book || !book.isIssued) {
      return res.status(400).json({ message: "Book not issued" });
    }

    book.isIssued = false;
    book.issuedTo = null;
    book.issueDate = null;
    await book.save();

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error returning book" });
  }
};

/* ================= BOOK STATS ================= */
exports.getBookStats = async (req, res) => {
  try {
    const total = await Book.countDocuments();
    const issued = await Book.countDocuments({ isIssued: true });
    const available = total - issued;

    res.json({ total, issued, available });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};
/* ================= DELETE BOOK ================= */
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

/* ================= ADMIN: ISSUED BOOKS BY STUDENT ID ================= */
exports.getIssuedBooksByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const books = await Book.find({ issuedTo: studentId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching issued books" });
  }
};
