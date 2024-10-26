# Vend-O-Matic

A vending machine service for purchasing beverages with coins. The application is a full Javascript project, consists of a Node.js/Express backend server and a React frontend interface.

![Demonstration of Vend-O-Matic](https://i.imgur.com/mEa0J2c.gif)

## Table of Contents

1. **[About Vend-O-Matic](#about-vend-o-matic)**
   * **[Features](#features)**
   * **[Beverages](#beverages)**
   * **[Code Structure](#code-structure)**
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

### Beverages

- Cola (50¢) 🥤
- Sprite (50¢) 🥂
- Water (50¢) 💧

### Code Structure

```
vend-o-matic/
├── server/
│   ├── services/
│   │   └── vendingMachine.js     # Business logic
│   ├── tests/
│   │   └── vendingMachine.test.js
│   └── server.js                 # API routes
└── client/
    ├── app/
    │   ├── components/
    │   │   └── VendingMachine.js # Frontend
    │   └── page.js
    └── public/
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
