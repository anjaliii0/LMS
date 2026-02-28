const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const { verifyToken, isAdmin } = require("../middleware/auth");

const {
  addBook,                    // ✅ ADD THIS
  getBooks,
  searchBook,
  issueBook,
  returnBook,
  deleteBook,
  getBookStats,
  getIssuedBooksByStudentId,
} = bookController;

// ================= ADD BOOK (ADMIN) =================
router.post("/", verifyToken, isAdmin, addBook);   // ✅ THIS WAS MISSING

// ADMIN: get issued books by student ID
router.get(
  "/issued/student/:studentId",
  verifyToken,
  isAdmin,
  getIssuedBooksByStudentId
);

router.get("/", verifyToken, getBooks);
router.get("/search", verifyToken, searchBook);
router.get("/stats", verifyToken, getBookStats);

router.post("/issue", verifyToken, isAdmin, issueBook);
router.post("/return", verifyToken, isAdmin, returnBook);
router.delete("/:id", verifyToken, isAdmin, deleteBook);

module.exports = router;
