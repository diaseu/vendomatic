// Data model - Drinks
// 3 different kinds, qty 5 of each. Price is 2 quarters (coins) per drink. 
// Initial Stock, Current Stock
const DRINKS = [
    { 
      name: 'Cola',
      emoji: '🥤',
      price: 2,      // quarters
      quantity: 5    // 
    },
    { 
      name: 'Sprite',
      emoji: '🥂',
      price: 2,
      quantity: 5
    },
    { 
      name: 'Water',
      emoji: '💧',
      price: 2,
      quantity: 5
    }
  ];

class VendingMachineService {
    constructor() {
        this.state = {
          coins: 0
        };
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

    // Get inventory - only return quantities
    getInventory() {
        return DRINKS.map(drink => drink.quantity);
    }

    // Get product details - name and price
    getDetails() {
        return DRINKS.map(({ name, price, emoji }) => ({ name, price, emoji }));
    }

    // Get item
    getInventoryItem(id) {
        if (id < 0 || id >= DRINKS.length) {
            return null;
        }
        return DRINKS[id].quantity;
    }

    // buy drink [ this needs more logic but come back to this ]
    // success: right number of coins (no change), too many coins (yes change)
    // fail: not choose right drink, not enough coins (yes change), not enough inventory. 
    purchase(id) {
        // does drink exist
        if (id < 0 || id >= DRINKS.length) {
            return {
                error: 'invalid_drink',
                coinsReturned: this.state.coins
            }
        }

        const drink = DRINKS[id];

        // check inventory stock (not enough inventory)
        if (drink.quantity === 0) {
            return {
                error: 'out_of_stock',
                coinsReturned: this.state.coins
            }
        }

        // check coins input vs cost (not enough coins)
        if (this.state.coins < drink.price) {
            return{
                error: 'insufficient_funds',
                coinsReturned: this.state.coins
            }
        }

        // buying the drink
        // remove from inventory, make change, reset coins
        drink.quantity--;
        const change = this.state.coins - drink.price;
        this.state.coins = 0;
    
        return {
            error: null,
            change,
            remainingQuantity: drink.quantity
        }
    }

}

module.exports = new VendingMachineService();