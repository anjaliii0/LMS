import { useState } from "react";
import API from "../services/api";

function IssueModal({ book, onClose, onIssued }) {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");

  const issueBook = async () => {
    if (!studentName || !studentId) {
      alert("Please fill all fields");
      return;
    }

    await API.post("/books/issue", {
      bookId: book.bookId,
      studentId,
      studentName,
    });

    onIssued();
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Issue Book</h3>

        <p>
          <strong>{book.title}</strong> by {book.author}
        </p>

        <input
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <div style={{ marginTop: "15px", textAlign: "right" }}>
          <button onClick={onClose} style={{ marginRight: "10px" }}>
            Cancel
          </button>
          <button className="primary-btn" onClick={issueBook}>
            Issue Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default IssueModal;

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "360px",
};
