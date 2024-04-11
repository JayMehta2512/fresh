import React, { useState, useEffect } from 'react';
import { collection, addDoc, getFirestore, query, where, getDocs } from 'firebase/firestore'; // Import Firestore
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import "./Review.css"

const Review = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const firestore = getFirestore();
      const reviewsRef = collection(firestore, 'reviews');
      const reviewsQuery = query(reviewsRef, where('email', '==', email));
      const reviewsSnapshot = await getDocs(reviewsQuery);
      const reviewsData = reviewsSnapshot.docs.map(doc => doc.data());
      setReviews(reviewsData);

      // Calculate average rating
      const totalRating = reviewsData.reduce((acc, review) => acc + review.rating, 0);
      const avgRating = totalRating / reviewsData.length || 0;
      setAverageRating(avgRating);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const firestore = getFirestore();
      await addDoc(collection(firestore, 'reviews'), {
        name,
        email: currentUser.email,
        content,
        rating
      });
      fetchReviews(); // Refresh reviews after submission
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea placeholder="Your Review" value={content} onChange={(e) => setContent(e.target.value)} required />
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>

      <h2>User Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index}>
          <h3>{review.name}</h3>
          <p>{review.content}</p>
          <p>Rating: {review.rating} Stars</p>
        </div>
      ))}

      <h2>Average Rating: {averageRating.toFixed(1)} Stars</h2>
    </div>
  );
};

export default Review;
