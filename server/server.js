const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple chatbot endpoint
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  // Example dummy responses
  let response = "Sorry, I don't understand.";

  if (message.toLowerCase().includes("math")) {
    response = "Sure, I can help you with maths!";
  } else if (message.toLowerCase().includes("physics")) {
    response = "Physics is fascinating! What do you want to know?";
  }

  res.json({ response });
});

// Serve frontend static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
