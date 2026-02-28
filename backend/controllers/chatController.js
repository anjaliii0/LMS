/*const axios = require("axios");

exports.chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    
    // 2026 Stable Alias for v1beta
    const model = "gemini-2.5-flash"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(url, {
      contents: [
        {
          role: "user",
          parts: [{ text: `System: You are a library assistant. Answer only about books. \nUser: ${message}` }]
        }
      ]
    });

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble thinking right now.";
    res.json({ reply });

  } catch (error) {
    // This will help you see if it's an Auth error or a Model error
    console.error("GEMINI API ERROR:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data?.error?.message || "Internal Server Error"
    });
  }
};*/

const axios = require("axios");
const Book = require("../models/Book");

exports.chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    // 1. Fetch library data for context
    const books = await Book.find({}, "title author status");
    const bookList = books.map(b => `- ${b.title} by ${b.author} (${b.status})`).join("\n");

    const model = "gemini-2.5-flash"; // Use your current working model ID
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(url, {
  contents: [
    {
      role: "user",
      parts: [{ 
        text: `You are a professional Library Assistant. 

### DATABASE RULES:
1. Below is a list of books currently available in OUR library.
2. If a user asks for a book that IS in this list, confirm its availability and mention its status.
3. If a user asks for a book or genre (like "horror") that IS NOT in our list, do NOT just say "not in database." Instead, use your internal knowledge to suggest famous books from that genre, but add a note: "(Note: These are not currently in our library stock, but are highly recommended)."

### OUR LIBRARY DATABASE:
${bookList || "The library database is currently empty."}

### USER QUESTION:
${message}` 
      }]
    }
  ]
});

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that.";
    res.json({ reply });

  } catch (error) {
    console.error("CHAT ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Server Error" });
  }
};