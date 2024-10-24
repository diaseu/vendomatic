// Data model - Drinks
// 3 different kinds, qty 5 of each. Price is 2 quarters (coins) per drink. 
const DRINKS = [
    { name: 'Pepsi', price: 2, initialStock: 5 },
    { name: 'Cola', price: 2, initialStock: 5 },
    { name: 'Sprite', price: 2, initialStock: 5 }
  ];

class VendingMachineService {
    constructor() {
        this.state = {
          inventory: DRINKS.map(drink => drink.initialStock),
          coins: 0
        };
      }

    // Get inventory
    getInventory() {
        return [...this.state.inventory]
    }

    // Get item
    getInventoryItem(id) {
        if (id < 0 || id >= this.state.inventory.length) {
            return null;
        }
        return this.state.inventory[id];
    }

    // Insert coin (quarter)
    insertCoin() {
        this.state.coins++;
        return this.state.coins;
    }

    // return coin (invalid coins)
    returnCoins() {
        const coinsToReturn = this.state.coins;
        this.state.coins = 0;
        return coinsToReturn;
    }

    // buy drink [ this needs more logic but come back to this ]
    // success: right number of coins (no change), too many coins (yes change)
    // fail: not choose right drink, not enough coins (yes change), not enough inventory. 
    purchase(id) {
        // is it a valid drink
        if (id < 0 || id >= DRINKS.length) {
            return {
                error: 'invalid_drink',
                coinsReturned: this.state.coins
            }
        }

        // check inventory stock (not enough inventory)
        if (this.state.inventory[id] === 0) {
            return {
                error: 'out_of_stock',
                coinsReturned: this.state.coins
            }
        }

        // check coins input vs cost (not enough coins)
        if (this.state.coins < DRINKS[id].price) {
            return{
                error: 'insufficient_funds',
                coinsReturned: this.state.coins
            }
        }

        // buying the drink
        // remove from inventory, make change, reset coins
        this.state.inventory[id]--;
        const change = this.state.coins - price;
        this.state.coins = 0;
    
        return {
            error: null,
            change,
            remainingQuantity: this.state.inventory[id]
        }
    }

}

module.exports = new VendingMachineService();