// UserSubscriptionList.js
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, getFirestore, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import '../styles/SubscriptionList.css'; // Import CSS file

const products = [
  {
    id: 1,
    name: 'Standard Jug',
    description: 'Regular jug for water.',
  },
  {
    id: 2,
    name: 'Premium Mineral Water Jug',
    description: 'Jug with mineral water for better health.',
  },
  // Add more products as needed
];

const UserSubscriptionList = () => {
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  // Fetch user's subscriptions from Firestore
  const fetchUserSubscriptions = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const firestore = getFirestore();
    const subscriptionsQuery = query(collection(firestore, 'subscriptions'), where('userId', '==', userId));
    const querySnapshot = await getDocs(subscriptionsQuery);
    const subscriptions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUserSubscriptions(subscriptions);
  };

  useEffect(() => {
    fetchUserSubscriptions();
  }, []); // Fetch subscriptions on component mount

  // Handle deactivation of subscription
  const handleDeactivateSubscription = async (subscriptionId) => {
    try {
      const firestore = getFirestore();
      await deleteDoc(doc(firestore, 'subscriptions', subscriptionId));
      setUserSubscriptions(prevSubscriptions => prevSubscriptions.filter(sub => sub.id !== subscriptionId));
      console.log('Subscription deactivated successfully');
    } catch (error) {
      console.error('Error deactivating subscription: ', error);
    }
  };

  const getProductDetails = (productId) => {
    return products.find(product => product.id === productId);
  };

  return (
    <div className="subscription-list">
      <h2>Your Subscriptions</h2>
      <ul>
        {userSubscriptions.map(subscription => (
          <li key={subscription.id} className="subscription-item">
            {/* Display subscription details */}
            <p>Product: {getProductDetails(subscription.productId)?.name}</p>
            <p>Description: {getProductDetails(subscription.productId)?.description}</p>
            <p>Frequency: {subscription.frequency}</p>
            <p>Quantity: {subscription.quantity}</p>
            <p>Start Date: {subscription.startDate.toDate().toDateString()}</p>
            <p>End Date: {subscription.endDate ? subscription.endDate.toDate().toDateString() : 'N/A'}</p>
            <button onClick={() => handleDeactivateSubscription(subscription.id)}>Deactivate Subscription</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSubscriptionList;
