import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here (e.g., send data to server).
    console.log('Payment submitted by:', currentUser.email);
    console.log('Card Number:', cardNumber);
    console.log("Card Holder's Name:", cardHolder);
  };

  return (
    <Form onSubmit={handlePaymentSubmit}>
      <Form.Group controlId="cardNumber">
        <Form.Label>Card Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="cardHolder">
        <Form.Label>Cardholder's Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter cardholder's name"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Pay Now
      </Button>
    </Form>
  );
};

export default PaymentForm;
