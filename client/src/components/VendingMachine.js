// client/app/components/VendingMachine.js
import React, { useState, useEffect } from 'react';

const VendingMachine = () => {
  const [quarters, setQuarters] = useState(0);
  const [drinks, setDrinks] = useState([]);
  const [message, setMessage] = useState('');
  const [change, setChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [inventoryRes, detailsRes] = await Promise.all([
        fetch('http://localhost:3001/inventory'),
        fetch('http://localhost:3001/inventory/details')
      ]);

      const quantities = await inventoryRes.json();  // [5, 5, 5]
      const details = await detailsRes.json();       // [{ name, price }, ...]

      const drinksWithQuantities = details.map((drink, index) => ({
        ...drink,
        quantity: quantities[index]
      }));

      setDrinks(drinksWithQuantities);
      setIsLoading(false);
    } catch (error) {
      setMessage('Error fetching data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const insertQuarter = async () => {
    try {
      const res = await fetch('http://localhost:3001/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coin: 1 })
      });
      const coins = parseInt(res.headers.get('X-Coins'));
      setQuarters(coins);
      setMessage('Quarter inserted!');
      setChange(0);
    } catch (error) {
      setMessage('Error inserting quarter');
    }
  };

  const purchase = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/inventory/${id}`, {
        method: 'PUT'
      });

      const returnedCoins = parseInt(res.headers.get('X-Coins'));
      setChange(returnedCoins);
      setQuarters(0);

      if (res.status === 404) {
        setMessage('Item out of stock');
        return;
      }

      if (res.status === 403) {
        const drink = drinks[id];
        setMessage(`Need ${drink.price} quarters ($${(drink.price * 0.25).toFixed(2)})`);
        return;
      }

      if (res.ok) {
        const remainingQuantity = parseInt(res.headers.get('X-Inventory-Remaining'));
        setDrinks(prev => prev.map((drink, index) => 
          index === id ? { ...drink, quantity: remainingQuantity } : drink
        ));
        setMessage(`Enjoy your ${drinks[id].name}! ${drinks[id].emoji}`);
      }
    } catch (error) {
      setMessage('Error processing purchase');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl bg-gray-200 rounded-lg shadow p-6 mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Dia's Vend-O-Matic</h1>
      </div>
      
      {/* Main container with responsive flex */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Drink Menu - takes up half width on medium screens and up */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl text-center font-bold mb-4">Drink Menu</h2>
          <div className="flex flex-col gap-3">
            {drinks.map((drink, index) => (
              <button
                key={index}
                onClick={() => purchase(index)}
                disabled={drink.quantity === 0}
                className="p-3 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 text-left"
              >
                <div className="text-lg text-center">{drink.emoji} {drink.name} - ${(drink.price * 0.25).toFixed(2)}</div>
                <div className="text-sm text-center text-gray-600">({drink.quantity} left)</div>
              </button>
            ))}
          </div>
        </div>

        {/* Coin Interface - takes up half width on medium screens and up */}
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl text-center font-bold mb-4">Insert Coins First</h2>
          <div className="space-y-4">
            <div className="text-sm text-gray-500 text-center">
              <p>Only quarters accepted</p>
              <p>Any change auto-returned</p>
            </div>
            
            <button
              onClick={insertQuarter}
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
            >
              Insert Quarter (25¢)
            </button>
            
            <div className="text-xl text-center">
              Quarters: {quarters} (${(quarters * 0.25).toFixed(2)})
            </div>
            
            {message && (
              <div className="p-3 text-gray-700 text-center rounded-lg bg-gray-200">
                {message}
              </div>
            )}
            
            {change > 0 && (
              <div className="text-green-600 text-right border-t pt-4 mt-4">
                <h5 className="font-bold">Change returned:</h5>
                <div>{change} quarters (${(change * 0.25).toFixed(2)})</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendingMachine;