import { Link, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Dashboard from './pages/Dashboard';
import Weighttracker from './pages/Weighttracker';
import Worklog from './pages/Worklog';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import Logout from './pages/Auth/Logout';
import Sidebarmenu from './components/Sidebarmenu';
import Thememode from './components/Thememode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getWorklogsAction } from './redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
function App() {
   const user = useSelector((state)=> state.auth.user);
  const worklogs = useSelector((state) => state.worklogs.worklogs);
 
  const dispatch = useDispatch();
useEffect(() => {
  const fetchWorklogs = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(`http://localhost:5000/worklogs?userId=${user.id}`);
      dispatch(getWorklogsAction(res.data));
    } catch (err) {
      console.error('Failed to fetch worklogs:', err);
    }
  };

  // Only fetch if worklogs are empty and user ID is present
  if (user?.id && worklogs.length === 0) {
    fetchWorklogs();
  }
}, [user?.id, worklogs.length, dispatch]);
  return (
     <div className="flex min-h-screen transition-colors duration-300 ">
     <Thememode  />

    

      <Sidebarmenu />

      {/* Main Content */}
      <main className="flex-1 min-h-screen text-black bg-gray-100 dark:bg-gray-50 dark:text-gray-900">
         <div className="flex transition-colors duration-300 ">
   
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/work-log" element={<Worklog />} />
          <Route path="/weight-tracker" element={<Weighttracker />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
   </div>   </main>
    </div>
  )
}
export default App
