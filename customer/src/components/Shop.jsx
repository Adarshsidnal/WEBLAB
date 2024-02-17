// Shop.jsx
import React, { useState } from 'react';
import './Shop.css';

function Shop() {
    const [cart, setCart] = useState([]);
    const [bill, setBill] = useState(null);

    const items = [
        { itemName: 'Carrot', price: 10 },
        { itemName: 'Cake', price: 20 },
        { itemName: 'Roti', price: 15 },
    ];

    const addToCart = (itemName, price, quantity) => {
        const newItem = { itemName, price, quantity };
        setCart([...cart, newItem]);
    };

    const generateBill = () => {
        let totalAmount = 0;
        for (const item of cart) {
            totalAmount += item.price * item.quantity;
        }
        setBill({
            items: cart,
            totalAmount,
        });
    };

    return (
        <div className="Shop">
            <h2>Shop</h2>
            <div className="items-list">
                {items.map((item, index) => (
                    <div key={index} className="item">
                        <span>{item.itemName} - {item.price}</span>
                        <button onClick={() => addToCart(item.itemName, item.price, 1)}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <div className="cart">
                <h3>Cart</h3>
                {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                        <span>{item.itemName}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: {item.price * item.quantity}</span>
                    </div>
                ))}
                {cart.length > 0 && (
                    <button onClick={generateBill}>Buy</button>
                )}
            </div>
            {bill && (
                <div className="bill">
                    <h3>Bill</h3>
                    {bill.items.map((item, index) => (
                        <div key={index} className="bill-item">
                            <span>{item.itemName}</span>
                            <span>Quantity: {item.quantity}</span>
                            <span>Price: {item.price * item.quantity}</span>
                        </div>
                    ))}
                    <div className="total">Total Amount: {bill.totalAmount}</div>
                </div>
            )}
        </div>
    );
} 


export default Shop;
