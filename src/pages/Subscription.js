import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { collection, addDoc, getFirestore } from 'firebase/firestore'; // Import Firestore
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import '../styles/Subscription.css';

const products = [
  {
    id: 1,
    name: 'Standard Jug',
    description: 'Regular jug for water.',
    priceWeekly: '100rs per week',
    priceMonthly: '350rs per month',
    imageUrl: require('./Subscription/Jar.webp'), 
    overlayText: 'Standard Jug',
    stampText: "",
  },
  {
    id: 2,
    name: 'Premium Mineral Water Jug',
    description: 'Jug with mineral water for better health.',
    priceWeekly: '120rs per week',
    priceMonthly: '400rs per month',
    imageUrl: require('./Subscription/Mineraljug.jfif'), 
    overlayText: ' Mineral Water',
    stampText: "Mineral",
  },
  {
    id: 3,
    name: 'Alkaline Water Jug',
    description: 'Jug with alkaline water for better hydration.',
    priceWeekly: '140rs per week',
    priceMonthly: '500rs per month',
    imageUrl: require('./Subscription/Alkalinejug.jpg'), 
    overlayText: 'Alkaline Water ',
    stampText: "Alkaline",
  },
  {
    id: 4,
    name: 'RO Water Jug',
    description: 'Jug with purified water through reverse osmosis filtration.',
    priceWeekly: '130rs per week',
    priceMonthly: '450rs per month',
    imageUrl: require('./Subscription/ROjug.jpg'), 
    overlayText: 'RO Water Jug',
    stampText: "Purified",
  }
];

const SubscriptionPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState('weekly');
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Listen for changes to the authentication state
  onAuthStateChanged(getAuth(), (user) => {
    setCurrentUser(user);
  });

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  const handleFrequencyChange = (event) => {
    setSelectedFrequency(event.target.value);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const calculateEndDate = () => {
    const endDate = new Date(startDate);
    if (selectedFrequency === 'weekly') {
      endDate.setDate(endDate.getDate() + 6); // Add 6 days for weekly subscription
    } else if (selectedFrequency === 'monthly') {
      endDate.setDate(endDate.getDate() + 30); // Add 30 days for monthly subscription
    }
    return endDate.toDateString();
  };

  const handleSubscribe = async () => {
    try {
      if (currentUser) {
        const firestore = getFirestore();
        await addDoc(collection(firestore, 'subscriptions'), {
          userId: currentUser.uid, // Include the user's ID
          productId: selectedProduct.id,
          frequency: selectedFrequency,
          quantity,
          startDate
        });
        console.log('Subscription added successfully');
        setShowNotification(true);
         // Show notification after subscription is added
      } else {
        console.error('No user logged in.');
      }
    } catch (error) {
      console.error('Error adding subscription: ', error);
    }
  };

  return (
    <div className="subscription-page">
      <Link to="/userSubs">View Your Subscriptions</Link>
      <h2>Choose Your Subscription</h2>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product">
            <div className="image-container">
              <img src={product.imageUrl} alt={product.name} />
              <div className="stamp">{product.stampText}</div>
              
            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price Weekly: {product.priceWeekly}</p>
            <p>Price Monthly: {product.priceMonthly}</p>
            <div className="subscription-options">
              <label>Select Quantity: </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <label>Select Frequency: </label>
              <select value={selectedFrequency} onChange={handleFrequencyChange}>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <DatePicker 
                selected={startDate} 
                onChange={date => setStartDate(date)} 
                minDate={new Date()} // Set minDate to today
              />
              <button onClick={() => handleProductSelect(product)}>Subscribe Now</button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedProduct && (
        <div className="selected-product">
          <h3>Selected Product: {selectedProduct.name}</h3>
          <p>Price: {selectedFrequency === 'weekly' ? selectedProduct.priceWeekly : selectedProduct.priceMonthly}</p>
          <p>Quantity: {quantity}</p>
          <p>Start Date: {startDate.toDateString()}</p>
          <p>End Date: {calculateEndDate()}</p>
          {showNotification && (
            <p className="notification">Subscription added successfully!</p>
          )}
          <Link to="/checkout1" onClick={handleSubscribe}>Proceed to Checkout</Link>
        </div>
      )}
      
    </div>
  );
};

export default SubscriptionPage;
