import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // ✅ fixed here
import 'react-toastify/dist/ReactToastify.css';
import { Eye,EyeOff } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword,setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = (e) => {
      setShowPassword(!showPassword)
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
    const users = await response.json();

    if (users.length > 0) {
  dispatch(login(users[0]));
  toast.success('Login successful!');
  setTimeout(() => {
    navigate('/dashboard');
  }, 1000); 
} else {
  toast.error('Invalid email or password.');
}
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-4 text-center bg-center bg-cover bg-image">
            <div className='w-1/2 max-w-2xl px-6 py-4 border rounded-lg xl:w-1/3 backdrop-blur-md bg-white/80 border-gray-500/30'>
<form onSubmit={handleLogin} className="w-full space-y-4">
  
      <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
        <label htmlFor="email" className="block mb-1 text-sm font-medium text-left text-black">Email Address</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-left text-black">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <span onClick={handleTogglePasswordVisibility} className="absolute top-1/2 right-3">
        {showPassword ? (<EyeOff />) : (<Eye />)}
        </span>
        </div>
        <button  className="w-full py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800">
          Login
        </button>
        <p className="text-sm text-center text-black">
          Don't have an account?{' '}
          <Link to="/sign-up" className="font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
</div>
      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

    </div>

  );
}

export default LoginForm;
