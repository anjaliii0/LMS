import { useState } from "react";
import API from "../services/api";

function AddBook({ onBookAdded }) {
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = async () => {
    if (!bookId || !title || !author) {
      alert("Please fill all fields");
      return;
    }

    await API.post("/books", {
      bookId,
      title,
      author,
    });

    // 🔥 CLEAR FORM
    setBookId("");
    setTitle("");
    setAuthor("");

    // 🔥 REFRESH TABLE + STATS
    onBookAdded();
  };

  return (
    <div className="card">
      <h3>Add New Book</h3>

      <div className="form-grid">
        <input
          placeholder="Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <button className="primary-btn" onClick={addBook}>
        Add Book
      </button>
    </div>
  );
}

export default AddBook;
