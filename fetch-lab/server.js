"use strict";

const express = require('express');
const app = express();

let messages = [
  { id: 1, text: "Welcome to the message board!", author: "Admin" },
];
let nextId = 2;


// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse JSON request bodies (needed for POST)
app.use(express.json());

// ---- Your endpoints go below this line ----
app.get('/hello', (req, res) => {
  res.type('text').send('Hello from the server!');
});

app.get('/api/time', (req, res) => {
  const userData = {
    currentTime: new Date().toISOString(),
    message: "Current server time"

  };
  res.type('json').send(userData);
});

app.get('/api/greet/:name', (req, res) => {
  const userData = {
    greeting: "Hello, " + req.params.name + "! Welcome to the API."
  };
  res.type('json').send(userData);
});

app.get("/api/math", (req, res) => {
  let a = Number(req.query.a);
  let b = Number(req.query.b);
  let operation = req.query.operation;
  let result = 0;

  if (!operation) {
    return res.status(400).json({ error: 'Invalid or missing operation. Use: add, subtract, multiply, divide' });
  }

  switch (operation) {
    case "add":
      result = parseInt(a) + parseInt(b);
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      if (b == 0) {
        res.status(400).json({ error: 'Cannot divide by zero' });
      }
      result = a / b;
      break;
  }


  res.type('json').send({ a: a, b: b, operation: operation, result: result });
});

app.get('/api/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      message: "Sorry for the wait!",
      delayMs: 3000
    });
  }, 3000);
});

app.get('/api/unreliable', (req, res) => {
  const rand = Math.random();
  if (rand < 0.5) {
    res.status(500).json({
      error: "Server had a bad day. Try again!"
    });
  } else {
    res.json({
      message: "Lucky! It worked this time.",
      luckyNumber: Math.floor(Math.random() * 100)
    });
  }
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  let text = req.body.text;
  let author = req.body.author;
  
  if(text == null || author == null){
    res.status(400).json({
      error: "text and author are required"
    });
  }
  
  let newMessages =  { id: nextId++, text, author };
  
  messages.push(newMessages);
  res.status(201).json(newMessages);

});

// ---- Your endpoints go above this line ----

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
