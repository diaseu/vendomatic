const express = require('express');
const cors = require('cors');
const vendingMachine = require('./services/vendingMachine');

const app = express();

app.use(express.json());
// Note: There looks to be two different kinds of response header: X-Coins and X-Inventory-Remaining
app.use(cors({
    exposedHeaders: ['X-Coins', 'X-Inventory-Remaining']
}));

// Define Necessary Routes here
// PUT '/' - 204
app.put('/', (req, res) => {

    res.status(204).send();
})

// DELETE '/' - 204
app.delete('/', (req, res) => {

    res.status(204).send();
})

// GET '/inventory' - 200 - Get all inventory
app.get('/inventory', (req, res) => {
    const inventory = vendingMachine.getInventory();
    res.status(200).json(inventory);
})

// GET '/inventory/:id' - 200 - Get drink quantity
app.get('inventory/:id', (req, res) => {

})



// PUT '/inventory/:id' - 200, 403, 404
app.put('/inventory/:id', (req, res) => {
    // PUT '/inventory/:id' - 404

    res.status(404).send();

    // PUT '/inventory/:id' - 403

    res.status(403).send();

    // PUT '/inventory/:id' - 200

    res.status(200).send();
})


app.listen(3001, () => {
    console.log('Server running on port 3001');
  });