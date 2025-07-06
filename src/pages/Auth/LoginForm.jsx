import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // ✅ fixed here
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
    const users = await res.json();

    if (users.length > 0) {
  dispatch(login(users[0]));
  toast.success('Login successful!');
  setTimeout(() => {
    navigate('/dashboard');
  }, 1000); // Wait 1 second
} else {
  toast.error('Invalid email or password.');
}
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 mx-auto space-y-4 bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold text-center text-gray-900">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full py-2 text-white bg-gray-700 rounded hover:bg-gray-800">
          Login
        </button>
        <p className="text-sm text-center">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-gray-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default LoginForm;
