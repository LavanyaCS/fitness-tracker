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
        const newUser = {
 id: Date.now().toString(),
  name,
  email,
  password,
  gender: "",
  age: "",
  targetSteps: "",
  totalWeight: "",
  targetWeight: "",
  currentWeight: "",
  worklogs: [],
  weightlogs: [],
  goals: []
      };

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

    <div className="flex flex-col items-center justify-center w-full h-screen px-4 text-center bg-center bg-cover bg-image">
      <div className='w-1/2 max-w-2xl px-6 py-4 border rounded-lg backdrop-blur-md bg-white/80 border-gray-500/30 xl:w-1/3'>
        <form onSubmit={handleSignup} className="w-full space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-900">Sign Up</h1>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-left text-black">Name</label>
          <input type="text" placeholder="Name" className="w-full p-2 border rounded"
            value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-left text-black">Email Address</label>
          <input type="email" placeholder="Email" className="w-full p-2 border rounded"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-left text-black">Password</label>
          <input type="password" placeholder="Password" className="w-full p-2 border rounded"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800">Register</button>
          <p className="text-sm text-center text-black">
            Already have an account?{' '}
            <Link to="/" className="font-semibold hover:underline">
              Login
            </Link>
          </p>    </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default SignupForm;
