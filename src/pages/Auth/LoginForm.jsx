import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
      dispatch(login(users[0]))
      alert('Login successful!');
      navigate('/dashboard');
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-center text-blue-600">Login</h2>
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
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>
       <p className="text-sm text-center">
        Don't have an account?{' '}<Link to="/sign-up" className="text-blue-600 hover:underline">Sign Up</Link>
      </p>
    </form>
  );
}

export default LoginForm;
