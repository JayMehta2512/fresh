import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './AdminD.css'; // Assuming this is the correct CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  // Fetch users and subscriptions from Firestore on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, 'users');
        const usersData = await getDocs(usersCollection);
        const formattedUsersData = usersData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(formattedUsersData);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    const fetchSubscriptions = async () => {
      try {
        const firestore = getFirestore();
        const subscriptionsCollection = collection(firestore, 'subscriptions');
        const subscriptionsData = await getDocs(subscriptionsCollection);
        const formattedSubscriptionsData = subscriptionsData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubscriptions(formattedSubscriptionsData);
      } catch (error) {
        console.error('Error fetching subscriptions:', error.message);
      }
    };

    fetchUsers();
    fetchSubscriptions();
  }, []);

  // Function to deactivate subscription
  const deactivateSubscription = async (subscriptionId) => {
    try {
      const firestore = getFirestore();
      const subscriptionDoc = doc(firestore, 'subscriptions', subscriptionId);
      await deleteDoc(subscriptionDoc);
      console.log('Subscription removed successfully from Firestore');

      // Update local state to reflect the removal
      setSubscriptions(prevSubscriptions =>
        prevSubscriptions.filter(subscription => subscription.id !== subscriptionId)
      );
    } catch (error) {
      console.error('Error removing subscription:', error.message);
    }
  };

  // Function to handle editing user data
  const handleEditUser = async (userId, newData) => {
    try {
      const firestore = getFirestore();
      const userDoc = doc(firestore, 'users', userId);
      await updateDoc(userDoc, newData);
      console.log('User data updated successfully');

      // Update local state with the updated user data
      setUsers(prevUsers =>
        prevUsers.map(user => {
          if (user.id === userId) {
            // Merge the new data into the user object
            return { ...user, ...newData };
          }
          return user;
        })
      );
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };

  // Function to remove user
  const handleRemoveUser = async (userId) => {
    try {
      const firestore = getFirestore();
      const userDoc = doc(firestore, 'users', userId);
      await deleteDoc(userDoc);
      console.log('User removed successfully from Firestore');

      // Update local state to reflect the removal
      setUsers(prevUsers =>
        prevUsers.filter(user => user.id !== userId)
      );
    } catch (error) {
      console.error('Error removing user:', error.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome to Admin Dashboard</h2>
      <Link to="/report" className="report-button">Report</Link>

      {/* Users section */}
      <div className="users-list">
        <h3>Users</h3>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Location</th>
              <th>Pincode</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}  </td>
                <td>{user.email}  </td>
                <td>{user.password}  </td>
                <td><input type="text" value={user.location} onChange={(e) => handleEditUser(user.id, { location: e.target.value })} /></td>
                <td><input type="text" value={user.pincode} onChange={(e) => handleEditUser(user.id, { pincode: e.target.value })} /></td>
                <td><input type="text" value={user.address} onChange={(e) => handleEditUser(user.id, { address: e.target.value })} /></td>
                <td><input type="text" value={user.phoneNumber} onChange={(e) => handleEditUser(user.id, { phoneNumber: e.target.value })} /></td>
                <td>
                  <button className="edit-button" onClick={() => handleEditUser(user.id, { name: 'New Name' })}>
                    Edit
                  </button>
                  <button className="remove-button" onClick={() => handleRemoveUser(user.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subscriptions section */}
      <div className="subscriptions-list">
        <h3>Subscriptions</h3>
        <table className="subscription-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Product ID</th>
              <th>Frequency</th>
              <th>Quantity</th>
              <th>Start Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(subscription => (
              <tr key={subscription.id}>
                <td>{subscription.id}</td>
                <td>{subscription.userId}</td>
                <td>{subscription.productId}</td>
                <td>{subscription.frequency}</td>
                <td>{subscription.quantity}</td>
                <td>{subscription.startDate.toDate().toDateString()}</td>
                <td>
                  <button onClick={() => deactivateSubscription(subscription.id)}>Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
