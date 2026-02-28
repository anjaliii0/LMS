import { useState } from "react";
import API from "../services/api";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await API.post("/chat", { message: input });

    const botMessage = { sender: "bot", text: res.data.reply };
    setMessages((prev) => [...prev, botMessage]);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <div
        style={floatingStyle}
        onClick={() => setOpen(!open)}
      >
        💬
      </div>

      {/* Chat Box */}
      {open && (
        <div style={chatBoxStyle}>
          <div style={headerStyle}>
            Library Assistant
          </div>

          <div style={messagesStyle}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px 0"
                }}
              >
                <span
                  style={{
                    background:
                      msg.sender === "user" ? "#4f46e5" : "#e5e7eb",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "inline-block"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div style={inputAreaStyle}>
            <input
              style={{ flex: 1 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about books..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}


const floatingStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#4f46e5",
  color: "#fff",
  padding: "15px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "20px",
  zIndex: 3000
};

const chatBoxStyle = {
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "300px",
  height: "400px",
  background: "#fff",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  zIndex: 3000
};

const headerStyle = {
  background: "#4f46e5",
  color: "#fff",
  padding: "10px",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px"
};

const messagesStyle = {
  flex: 1,
  padding: "10px",
  overflowY: "auto"
};

const inputAreaStyle = {
  display: "flex",
  padding: "10px",
  borderTop: "1px solid #ddd"
};

export default Chatbot;