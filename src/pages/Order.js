import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, getFirestore, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore
import { getAuth } from 'firebase/auth';
import "../styles/Order.css"; 
import { Link } from 'react-router-dom';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const auth = getAuth();
        if (!auth.currentUser) {
          throw new Error('No user logged in.');
        }
        const currentUser = auth.currentUser;

        const firestore = getFirestore();
        
        // Fetch products
        const productsRef = collection(firestore, 'products');
        const productsQuery = query(productsRef);
        const productsSnapshot = await getDocs(productsQuery);
        const productsData = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'jug' })); // Add type property for products
        
        // Fetch bottle sets orders
        const bottleSetsRef = collection(firestore, 'bottleSets');
        const bottleSetsQuery = query(bottleSetsRef, where('userId', '==', currentUser.uid));
        const bottleSetsSnapshot = await getDocs(bottleSetsQuery);
        const bottleSetsData = bottleSetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'set' })); // Add type property for bottle sets
        
        // Combine products and bottle sets orders
        const allItems = [...productsData, ...bottleSetsData];
        
        let total = 0;

        allItems.forEach(item => {
          const price = parseFloat(item.price);
          if (!isNaN(price)) {
            total += price * item.quantity; // Multiply price by quantity for total price
          } else {
            console.error('Invalid price for item:', item); // Log invalid prices
          }
        });

        setCartItems(allItems);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart items: ', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (docId, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === docId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    updateTotalPrice(updatedItems);
  };

  const updateTotalPrice = (updatedItems) => {
    let total = 0;
    updatedItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    const roundedTotal = total.toFixed(2);
    setTotalPrice(Number(roundedTotal));
  };

 const handleRemoveItem = async (docId, type) => {
  try {
    const firestore = getFirestore();
    const collectionName = type === 'jug' ? 'products' : 'bottleSets';
    await deleteDoc(doc(firestore, collectionName, docId)); // Delete the document from Firestore
    const updatedItems = cartItems.filter((item) => item.id !== docId);
    setCartItems(updatedItems);
    updateTotalPrice(updatedItems);
  } catch (error) {
    console.error('Error removing item: ', error);
  }
};


  const handleCheckout = () => {
    
    console.log('Redirecting to payment page...');
    <Link to="/checko"> </Link>
  };

  return (
    <div className="shopping-cart">
      <h2 >Your Shopping Cart</h2>
      <hr></hr>
      {cartItems.length === 0 ? (
        <p>Nothing in cart yet</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-info">
                  <div className="details">
                    <p className="name">{item.name}</p>
                    <p className="description">{item.description}</p>
                     {/* Stamp indicating jug or set */}
                  </div>
                  <><p className="type">{item.type === 'jug' ? 'Jug' : 'Set'}</p></>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <p className="price">Rs{item.price * item.quantity}</p> {/* Total price for this item */}
                <button className="remove-btn" onClick={() => handleRemoveItem(item.id, item.type)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="total-container">
            <p className="total">Total: Rs{totalPrice}</p>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
