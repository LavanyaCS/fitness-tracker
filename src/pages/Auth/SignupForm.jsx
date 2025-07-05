import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
      alert('Email already exists!');
      return;
    }
//Register User
 const newUser = { id: Date.now(),name, email, password };
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
<form onSubmit={handleSignup} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Sign Up</h2>
      <input type="text" placeholder="Name" className="w-full p-2 border rounded"
        value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" className="w-full p-2 border rounded"
        value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full p-2 border rounded"
        value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
<p className="text-sm text-center">
  Already have an account?{' '}
  <Link to="/" className="text-blue-600 hover:underline">
    Login
  </Link>
</p>    </form>
  );
}

export default SignupForm;
