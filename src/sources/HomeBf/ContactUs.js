import React from 'react';
import './Contact.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p className="contact-info">Feel free to reach out to us using the contact information below:</p>
      <ul className="contact-info-list">
        <li>Email: <Link to="mailto:wateronway@example.com">wateronway@example.com</Link></li>
        <li>Phone: <Link to="tel:+91 9010292349">+91 9010292349</Link></li>
        <li>Address:Satsung Residency Ahmedabad</li>
      </ul>
      <form className="contact-form">
        <h3>Send us Link message</h3>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};

export default ContactPage;
