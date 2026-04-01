"use strict";
 
const express = require('express');
const app = express();
 
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
    console.log("sdfsdfsdfsd")
    let a = req.query.a;
    let b = req.query.b;
    let operation = req.query.operation;
     let result = 0;
   switch(operation){
    case "add":
       result =  parseInt(a) + parseInt(b);
       break;
    case "subtract":
       result =  a - b;
       break;
    case "multiply":
       result =  a * b;
       break;
    case "divide":
       result =  a / b;
       break;

   }
   

  res.type('json').send({a: a, b :b , operation: operation, result: result});
});
 
// ---- Your endpoints go above this line ----
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
