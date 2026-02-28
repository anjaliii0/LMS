const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  bookId: String,
  studentName: String,
  studentId: String,
  issueDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Issue", issueSchema);
