const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { OpenAI } = require("openai");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Setup OpenAI with your key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST route to talk to the bot
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // or "gpt-4" if you have access
      messages: [{ role: "user", content: message }],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).send("Something went wrong!");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
