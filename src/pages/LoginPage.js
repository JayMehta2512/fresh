import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { Link } from 'react-router-dom';
import { database } from '../firebase/FirebaseConfig'; // Assuming 'database' is your Firebase authentication object
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showResetEmail, setShowResetEmail] = useState(false); // State to track whether to show reset email input

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(database, email, password);
      console.log('Login successful');
      if (email === 'jaymehta@gmail.com') {
        console.log("admin")
        window.location.href = '/adminD';
      } else {
        window.location.href = '/homeAf';
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError("Invalid Email Or Password");
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(database, resetEmail);
      setResetSuccess(true);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Password reset failed:', error.message);
      setError("Failed to send password reset email"); // Set error state to display error message
    }
  };

  const toggleResetEmail = () => {
    setShowResetEmail(!showResetEmail);
    setResetSuccess(false); // Reset success message when toggling reset email input
  };

  // Handle form submission when Enter key is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <form className="login-form">
          <label>
            Email:
            <input
              type="email" // Changed type to 'email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress} // Add key press event listener
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <br />
          
          {error && <p className="error-message">{error}
          <div className="forgot-password">
            <Link to="#" onClick={toggleResetEmail}>
              Forgot your password? 
            </Link>
            {showResetEmail && (
              <div className="reset-email-section">
                <label>
                  Enter your email to reset password:
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </label>
                <button type="button" onClick={handleForgotPassword}>
                  Reset Password
                </button>
                {resetSuccess && <p className="reset-success-message">Password reset email sent successfully</p>}
              </div>
            )}
          </div></p>
          } {/* Display error message if exists */}
        </form>
        <div className="signup-link">
          <p>Don't have an account?<Link to="/SignUp" className="nav-link"><span>New User</span></Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
