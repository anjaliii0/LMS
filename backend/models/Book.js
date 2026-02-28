const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: { type: String, unique: true },
  title: String,
  author: String,
  isIssued: { type: Boolean, default: false },
 issuedTo: {
  type: String,   // ✅ Student ID (e.g. STU-101)
  default: null,
},

  issueDate: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
