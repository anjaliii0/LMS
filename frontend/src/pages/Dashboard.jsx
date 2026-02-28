import { useEffect, useState } from "react";
import API from "../services/api";
import Chatbot from "../components/Chatbot";
import Stats from "../components/Stats";
import AddBook from "../components/AddBook";
import BookTable from "../components/BookTable";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    issued: 0,
    available: 0,
  });

  const fetchBooks = async () => {
    const res = await API.get("/books");
    setBooks(res.data);
  };

  const fetchStats = async () => {
    const res = await API.get("/books/stats");
    setStats(res.data);
  };

  const refreshAll = async () => {
    await fetchBooks();
    await fetchStats();
  };

  useEffect(() => {
    refreshAll();
  }, []);

  // ✅ SAFE SEARCH (does NOT mutate books)
  const filteredBooks = books.filter(
    (b) =>
      b.bookId.toLowerCase().includes(search.toLowerCase()) ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <>
    <div className="container">
      {user?.role === "admin" && <Stats stats={stats} />}
      {user?.role === "admin" && <AddBook onBookAdded={refreshAll} />}

      <input
        className="search"
        placeholder="Search by Book ID, Title, or Author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "14px", maxWidth: "420px" }}
      />

      <BookTable books={filteredBooks} onChange={refreshAll} />
    </div>

    {/* Floating Chatbot */}
    <Chatbot />
  </>
);
}
export default Dashboard;