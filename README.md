# Vend-O-Matic

A vending machine service for purchasing beverages with coins. The application is a full Javascript project, consists of a Node.js/Express backend server and a React frontend interface.

![Demonstration of Vend-O-Matic](https://i.imgur.com/mEa0J2c.gif)

## Table of Contents

1. **[About Vend-O-Matic](#about-vend-o-matic)**
   * **[Features](#features)**
   * **[Criteria Met](#critera-met)**
   * **[API Routes](#api-routes)**
   * **[Beverages](#beverages)**
   * **[Core Code Structure](#core-code-structure)**
2. **[Installation](#installation)**
   * **[Backend Setup](#backend-setup)**
   * **[Frontend Setup](#frontend-setup)**
3. **[Running the Application](#running-the-application)**
4. **[Making Changes](#making-changes)**
   * **[Frontend Setup](#frontend-setup)**
5. **[Libraries / Dependencies used](#how-to-use)**
6. **[Initial Gameplan Used](#initial-gameplan-used)**

## About Vend-O-Matic

### Features

- Accepts quarters for payment (one at a time)
- Displays available beverages and their prices
- Shows current inventory levels
- Automatically returns change
- Real-time inventory updates
- Responsive web interface

### Critera Met
1. The machine only accepts US quarters - you physically cannot put anything else in, and you can only put one coin in at a time.
2. Purchase price of an item is two US quarters.
3. Machine only holds five of each of the three beverages available to purchase in its inventory.
4. Machine will accept more than the purchase price of coins, but will only dispense a single beverage per transaction.
5. Upon transaction completion, any unused quarters must be dispensed back to the customer.
6. All test interactions will be performed with a single content type of “application/json”.
7. The API routes include the 7 required routes. (Note: I elected to add one additional route.) 

### API Routes
- [Required] `PUT /` - Insert a quarter 
  - Request body: `{"coin": 1}`
  - Response: 204 No Content
  - Header: X-Coins (number of coins accepted)

- [Required] `DELETE /` - Return inserted coins
  - Response: 204 No Content
  - Header: X-Coins (number of coins returned)

- [Required] `GET /inventory` - Get current inventory levels
  - Response: 200 OK
  - Body: Array of integers representing quantities

- [Elected]] `GET /inventory/details` - Get beverage details
  - Response: 200 OK
  - Body: Array of objects with name, price, and emoji

- [Required] `PUT /inventory/:id` - Purchase a beverage
  - Response: 
    - 200 OK (successful purchase)
    - 403 Forbidden (insufficient funds)
    - 404 Not Found (invalid selection or out of stock)
  - Headers: 
    - X-Coins (change returned)
    - X-Inventory-Remaining (updated quantity)


### Beverages

- Cola (50¢) 🥤
- Sprite (50¢) 🥂
- Water (50¢) 💧

### Core Code Structure

```
vend-o-matic/
├── server/
│   ├── services/
│   │   └── vendingMachine.js     # Business logic
│   └── server.js                 # API routes + Data Model
└── client/
    ├── src/
    │   ├── components/
    │   │   └── VendingMachine.js # Frontend
    │   └── index.js
```

## Installation

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/diaseu/vendomatic.git
cd vend-o-matic

# Setup backend
cd server
npm install
```

### Frontend Setup
```bash
# In a new terminal, from the project root
cd client
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd server
node server.js
# Server will start on http://localhost:3001
```

2. Start the frontend development server:
```bash
cd client
npm run dev
# Frontend will be available at http://localhost:3000
```

## How to Use

1. Insert Coins:
   - Click the "Insert Quarter" button to add 25¢
   - Current amount of inserted quarters is displayed
   - Multiple quarters can be inserted

2. Purchase a Beverage:
   - Each beverage costs 50¢ (2 quarters) - This can be changed [see ['Making Changes'](#making-changes)]
   - Click on a beverage from the Drink Menu to purchase
   - If insufficient funds, you'll get a more coins needed message and coins will be returned
   - Change is automatically returned if extra quarters were inserted

3. Inventory:
   - Each beverage starts with 5 units in stock - This can be changed [see ['Making Changes'](#making-changes)]
   - Current inventory is displayed for each item
   - Out-of-stock items are disabled
   - Inventory persists until server is restarted

### Making Changes

You can adjust item info (name, price, quantity, emoji) in the DRINKS data model in `server/services/vendingMachine.js`. 
You can even add additional drinks.  You must restart the backend server for these changes to be reflected.
```javascript
const DRINKS = [
  { 
    name: 'Drink',
    emoji: '🥤',
    price: 2,
    quantity: 5
  }
];
```

## Libraries / Dependencies used

- Backend:
  - Node.js
  - Express
  - cors

- Frontend:
  - React
  - Next.js
  - Tailwind CSS
  - postcss

## Initial Gameplan Used
1. Start with initiating all the necessary files first. Use minimal dependencies (though I'll use tailwind). Can start skeleton, but don't go beyond that yet.
2. Define data model. Drinks will have name, price, and initialStock.
    - Do we need to separate out the data model? It's just one model used for one service. Let's just keep it simple.
3. Define the core business. drink inventory, coins.
4. Logic to make vending machine work (I forgot to make service file in Step 1)
    - get inventory
    - get item
    - insert coin ($0.25 each)
    - return coin (any invalid coins)
    - buy drink - check if valid drink; if valid, check if enough inventory; then check input coins vs cost; 
        - successfully buying the drink: remove from inventory, determine change (coins - price), reset coins
5. Setup express server and middleware.
6. Write the API routes.
    - Test with postman. 
7. Frontend: define state management. 
8. Frontend: Use API Calls to make the actions.
9. Frontend: Build out the UI.
10. Frontend: Tailwind it out to make it pretty.
