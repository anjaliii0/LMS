import { useEffect, useState } from "react";
import API from "../services/api";

function MyBooks() {
  const [books, setBooks] = useState([]);

  const fetchMyBooks = async () => {
    const res = await API.get("/books/my-books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h3>📚 Issued Books</h3>

        {books.length === 0 ? (
          <p style={{ marginTop: "15px" }}>No books issued to you.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
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
                    {new Date(book.issueDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyBooks;
