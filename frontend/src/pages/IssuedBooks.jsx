import { useState } from "react";
import API from "../services/api";

function IssuedBooks() {
  const [studentId, setStudentId] = useState("");
  const [books, setBooks] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchIssuedBooks = async () => {
  if (!studentId) return;

  const res = await API.get(
    `/books/issued/student/${studentId}`
  );

  setBooks(res.data);
  setSearched(true);
};


  return (
    <div className="card">
      <h3>📕 Issued Books (Admin)</h3>

      {/* SEARCH BOX */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ flex: 1 }}
        />
        <button className="primary-btn" onClick={searchIssuedBooks}>
          Search
        </button>
      </div>

      {/* RESULT */}
      {searched && books.length === 0 ? (
        <p>No books issued to this student.</p>
      ) : (
        books.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Student</th>
                <th>Issue Date</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    {book.issuedTo?.name} <br />
                    <small>{book.issuedTo?.email}</small>
                  </td>
                  <td>
                    {new Date(book.issueDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

export default IssuedBooks;
