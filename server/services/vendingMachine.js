// Data model - Drinks
// 3 different kinds, qty 5 of each. Price is 2 quarters ($0.50) per drink. 
const DRINKS = [
    { name: 'Pepsi', price: 2, initialStock: 5 },
    { name: 'Cola', price: 2, initialStock: 5 },
    { name: 'Sprite', price: 2, initialStock: 5 }
  ];

class VendingMachineService {

    // get inventory

    // get item

    // insert coin ($0.25 each)
    insertCoin() {

    }

    // return coin (any leftover coins)
    returnCoin() {

    }

    // buy drink [ this needs more logic but come back to this ]
    // success: right number of coins (no change), too many coins (yes change)
    // fail: not enough coins (yes change), not enough inventory. 
    purchase() {

    }

}

module.exports = new VendingMachineService();