import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSignup = async (e) => {
    e.preventDefault();
    //Check If user is already register or not
    const existingUser = await fetch(`http://localhost:5000/users?email=${email}`);
    const data = await existingUser.json();

    if (data.length > 0) {
      toast.error('Email already exists!');
      return;
    }
    //Register User
    const newUser = { id: Date.now(), name, email, password };
    const registerRes = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    const registeredUser = await registerRes.json();

    dispatch(login(registeredUser)); // Redux login
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen ">
      <form onSubmit={handleSignup} className="w-full max-w-md p-6 mx-auto space-y-4 bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold text-center text-gray-900">Sign Up</h2>
        <input type="text" placeholder="Name" className="w-full p-2 border rounded"
          value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full py-2 text-white bg-gray-700 rounded hover:bg-gray-800">Register</button>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link to="/" className="text-gray-600 hover:underline">
            Login
          </Link>
        </p>    </form>
        
              <ToastContainer position="top-right" autoClose={3000} />
        </div>
  );
}

export default SignupForm;
