import React, { useState } from 'react';
import Auth from './Auth';
import './forgetpassword.css';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    // Logic to initiate the password reset process
    // You can add your API calls or other necessary code here
    console.log(`Initiating password reset for email: ${email}`);
  };

  return (
    <div className=" yellow_bg flex flex-col items-center justify-center min-h-screen">
      <div className=" form max-w-md w-full p-6 bg-white-100 rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Forgot Password</h2>
        <p className="mb-6 text-gray-600">
          Enter your email address to receive a password reset link.
        </p>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
