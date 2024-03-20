import React, { useState } from 'react';
import axios from 'axios';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [data, setData] = useState({
    Seller_Name: '',
    Seller_Email: '',
    Seller_Password: '',
    Seller_Phone: '',
    Seller_Address: '',
    Seller_PanNumber: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/signup', data);
      console.log(response);
      setSignupMessage('Sign-up successful!'); 
      navigate('/');
    } catch (error) {
      console.error('Sign-up failed:', error);
      setSignupMessage('Sign-up failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen p-4">
      <div className="p-8 rounded-md shadow-md w-full max-w-xl">
        <h1 className="text-4xl text-white font-bold mb-4 bg-blue-500 p-4 rounded-t-md text-center">SIGN UP</h1>
        <div className="bg-gray-100 p-6 rounded-b-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="Seller_Name" className="block mb-1">Name</label>
              <input
                type="text"
                id="Seller_Name"
                value={data.Seller_Name}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="Seller_Email" className="block mb-1">Email Address</label>
              <input
                type="text"
                id="Seller_Email"
                value={data.Seller_Email}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="Seller_Password" className="block mb-1">Password</label>
              <div className="flex items-center border-2 border-gray-300 rounded-md py-2 px-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="Seller_Password"
                  value={data.Seller_Password}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                />
                {showPassword ? (
                  <FaEye className="ml-2 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <IoMdEyeOff className="ml-2 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
            </div>
            <div>
              <label htmlFor="Seller_Phone" className="block mb-1">Phone Number</label>
              <input
                type="text"
                id="Seller_Phone"
                value={data.Seller_Phone}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="Seller_Address" className="block mb-1">Address</label>
              <textarea
                id="Seller_Address"
                value={data.Seller_Address}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div>
              <label htmlFor="Seller_PanNumber" className="block mb-1">PAN Number</label>
              <input
                type="text"
                id="Seller_PanNumber"
                value={data.Seller_PanNumber}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-md py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          {signupMessage && <p className="text-red-500">{signupMessage}</p>} 
        </div>
      </div>
    </div>
  );
};

export default SignUp;