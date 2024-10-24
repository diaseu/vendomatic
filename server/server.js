const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
// Note: There looks to be two different kinds of response header: X-Coins and X-Inventory-Remaining
app.use(cors());

// Define Necessary Routes here
// PUT '/' - 204
app.put('/', (req, res) => {

})

// DELETE '/' - 204
app.delete('/', (req, res) => {

})

// GET '/inventory' - 200
app.get('/inventory', (req, res) => {

})

// GET '/inventory/:id' - 200
app.get('inventory/:id', (req, res) => {

})

// PUT '/inventory/:id' - 200
app.put('/inventory/:id', (req, res) => {

})

// PUT '/inventory/:id' - 404
// PUT '/inventory/:id' - 403
app.put('/inventory/:id', (req, res) => {

})

app.listen(3001, () => {
    console.log('Server running on port 3001');
  });