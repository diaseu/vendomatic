const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
// Note: There looks to be two different kinds of response header: X-Coins and X-Inventory-Remaining
app.use(cors());

// Drinks config 
// Three different beverages, qty 5 of each. Price is 2 quarters ($0.50) per drink. 
const DRINKS = [
    { name: 'Pepsi', price: 2, initialStock: 5 },
    { name: 'Cola', price: 2, initialStock: 5 },
    { name: 'Sprite', price: 2, initialStock: 5 }
  ];

// Define Necessary Routes here
// PUT '/' - 204

// DELETE '/' - 204

// GET '/inventory' - 200

// GET '/inventory/:id' - 200

// PUT '/inventory/:id' - 200

// PUT '/inventory/:id' - 404

// PUT '/inventory/:id' - 403


app.listen(3001, () => {
    console.log('Server running on port 3001');
  });