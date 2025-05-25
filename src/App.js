import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const askBot = async () => {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question }),
    });

    const data = await response.json();
    setAnswer(data.reply);
  };

  return (
    <div className="App">
      <h1>🎓 Education Access Chatbot</h1>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about learning..."
      />
      <button onClick={askBot}>Ask</button>
      <p><strong>Bot:</strong> {answer}</p>
    </div>
  );
}

export default App;
