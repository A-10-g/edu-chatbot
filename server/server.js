// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

// Basic GET route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Mock chatbot logic for testing
app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message || '';
  let response = "I don't understand.";

  if (userMessage.toLowerCase().includes('math')) {
    response = "Let's solve a math problem together!";
  } else if (userMessage.toLowerCase().includes('science')) {
    response = "Science is fascinating! Ask me anything.";
  }

  res.json({ reply: response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
