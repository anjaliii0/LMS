import { useState } from "react";
import API from "../services/api";
import IssueModal from "./IssueModal";

function BookTable({ books = [], onChange }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedBook, setSelectedBook] = useState(null);

  const deleteBook = async (id) => {
    await API.delete(`/books/${id}`);
    onChange();
  };

  const returnBook = async (bookId) => {
    await API.post("/books/return", { bookId });
    onChange();
  };

  return (
    <div className="card">
      <h3>Book Collection</h3>

      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Issued To</th>
            <th>Issue Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No books found
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.bookId}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <span className={`badge ${book.isIssued ? "issued" : "available"}`}>
                    {book.isIssued ? "Issued" : "Available"}
                  </span>
                </td>
                <td>{book.issuedTo || "—"}</td>
                <td>
                  {book.issueDate
                    ? new Date(book.issueDate).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  {user?.role === "admin" && (
                    <>
                      {!book.isIssued ? (
                        <button
                          className="issue-btn"
                          onClick={() => setSelectedBook(book)}
                        >
                          Issue
                        </button>
                      ) : (
                        <button
                          className="issue-btn"
                          onClick={() => returnBook(book.bookId)}
                        >
                          Return
                        </button>
                      )}

                      <button
                        className="delete-btn"
                        onClick={() => deleteBook(book._id)}
                      >
                        🗑
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedBook && (
        <IssueModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onIssued={onChange}
        />
      )}
    </div>
  );
}

export default BookTable;
