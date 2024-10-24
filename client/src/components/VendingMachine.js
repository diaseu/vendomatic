import React, { useState, useEffect } from 'react';

const VendingMachine = () => {
    return(
        // Beverage Vending Machine Criteria
        // Three different beverages, qty 5 of each. Price is 2 quarters ($0.50) per drink. 
        // only quarters accepted, only one at a time
        // only 1 beverage per transaction
        // Unused quarters returned to user
        <div className="max-w-lg flex flex-col">
            <h1>Vend-O-Matic</h1>
            <div className="flex flex-row ">
                <div>Drink Menu</div>
                <div>Coin Interface</div>
            </div>
        </div>
    )
};

export default VendingMachine;