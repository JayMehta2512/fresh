import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore'; 
import { Link } from 'react-router-dom';
import './Report.css';

const ReportPage = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [newSubscriptions, setNewSubscriptions] = useState([]);
  const [productsBought, setProductsBought] = useState([]);

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, 'users');
        const today = new Date().setHours(0, 0, 0, 0); // Start of today
        const q = query(usersCollection, where('registrationDate', '>=', today));
        const querySnapshot = await getDocs(q);
        const newUsers = querySnapshot.docs.map(doc => doc.data().name);
        setNewUsers(newUsers);
      } catch (error) {
        console.error('Error fetching new users:', error);
        // Handle error
      }
    };

    const fetchNewSubscriptions = async () => {
      try {
        const firestore = getFirestore();
        const subscriptionsCollection = collection(firestore, 'subscriptions');
        const today = new Date().setHours(0, 0, 0, 0); // Start of today
        const q = query(subscriptionsCollection, where('registrationDate', '>=', today));
        const querySnapshot = await getDocs(q);
        const newSubscriptions = querySnapshot.docs.map(doc => doc.data());
        setNewSubscriptions(newSubscriptions);
      } catch (error) {
        console.error('Error fetching new subscriptions:', error);
        // Handle error
      }
    };

    const fetchProductsBought = async () => { 
      try {
        const firestore = getFirestore();
        const ordersCollection = collection(firestore, 'orders');
        const today = new Date().setHours(0, 0, 0, 0); // Start of today
        const q = query(ordersCollection, where('purchaseDate', '>=', today));
        const querySnapshot = await getDocs(q);
        const productsBought = querySnapshot.docs.map(doc => doc.data());
        setProductsBought(productsBought);
      } catch (error) {
        console.error('Error fetching products bought:', error);
        // Handle error
      }
    };

    fetchNewUsers();
    fetchNewSubscriptions();
    fetchProductsBought();

    return () => {}; // No cleanup needed for Firestore listeners
  }, []);

  return (
    <div className="report-page">
      <h2>Admin Report</h2>
      <Link to="/adminD" className="back-link">Back to Dashboard</Link>
      <div className="report-summary">
        <h3>New Users Today</h3>
        <ul>
          {newUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
        <h3>New Subscriptions Today</h3>
        <ul>
          {newSubscriptions.map((subscription, index) => (
            <li key={index}>
              {/* Render subscription details */}
              {subscription.name} - {subscription.type}
            </li>
          ))}
        </ul>
        <h3>Products Bought Today</h3>
        <ul>
          {productsBought.map((product, index) => (
            <li key={index}>
              {/* Render product details */}
              {product.name} - {product.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportPage;
