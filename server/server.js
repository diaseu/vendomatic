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
// PUT '/' - 204 - Insert Coin
app.put('/', (req, res) => {
    const { coin } = req.body;
    // Only one coin at a time
    if (coin !==1 ) {
        return res.status(400).json({error: 'Invalid coin value'})
    }
    const totalCoins = vendingMachine.insertCoin();
    res.setHeader('X-Coins', totalCoins)
    res.status(204).send();
})

// DELETE '/' - 204
app.delete('/', (req, res) => {
    const coinsReturned = vendingMachine.returnCoins();
    res.setHeader('X-Coins', coinsReturned);
    res.status(204).send();
})

// GET '/inventory' - 200 - Get all inventory - the requirements restrict this to only returning the quantity.
app.get('/inventory', (req, res) => {
    const quantities = vendingMachine.getInventory();
    res.status(200).json(quantities);
})

// How about we make a new route for getting the "static" details, like name and price
// That way we can keep the info in the data model
app.get('/inventory/details', (req, res) => {
    const details = vendingMachine.getDetails();
    res.status(200).json(details);
})

// GET '/inventory/:id' - 200 - Get drink quantity
app.get('inventory/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const quantity = vendingMachine.getInventoryItem(id);

    if (quantity === null) {
        return res.status(404).send();
    }

    res.status(200).json(quantity);
})

// PUT '/inventory/:id' - 200, 403, 404
app.put('/inventory/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = vendingMachine.purchase(id);
    
    // PUT '/inventory/:id' - 404
    if (result.error === 'invalid_drink' || result.error === 'out_of_stock') {
        res.setHeader('X-Coins', result.coinsReturned)
        return res.status(404).send();
    }

    // PUT '/inventory/:id' - 403
    if (result.error === 'insufficient_funds') {
        res.setHeader('X-Coins', result.coinsReturned)
        return res.status(403).send();
    }

    // PUT '/inventory/:id' - 200
    res.setHeader('X-Coins', result.change);
    res.setHeader('X-Inventory-Remaining', result.remainingQuantity);
    res.status(200).json({
        quantity: 1
    });
})


app.listen(3001, () => {
    console.log('Server running on port 3001');
  });