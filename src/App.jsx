import { Link, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Dashboard from './pages/Dashboard';
import Weighttracker from './pages/WeightTracker/Weighttracker';
import Worklog from './pages/WorkLog/Worklog';
import Goals from './pages/Goals/Goals';
import Profile from './pages/Profile';
import Logout from './pages/Auth/Logout';
import Sidebarmenu from './components/Sidebarmenu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadWeightlogsAction } from './redux/action';
function App() {
  const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

 return (
     <div className="flex min-h-screen transition-colors duration-300 ">
     {/* <Thememode  /> */}
      <Sidebarmenu />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto text-black bg-gray-50 dark:bg-gray-200 dark:text-gray-900">
           
          
  <Routes>
   {/* Public routes */}
    <Route path="/" element={<LoginForm />} />
    <Route path="/sign-up" element={<SignupForm />} />
  {/* Protected routes */}
    {user ? (
    <> {/* to group multiple protected routes */}
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/work-log" element={<Worklog />} />
    <Route path="/weight-tracker" element={<Weighttracker />} />
    <Route path="/goals" element={<Goals />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/logout" element={<Logout />} />
      </>) :
       (
    <>
              <Route
                path="*"
                element={
                  <div className="mt-10 text-center text-gray-600">
                    Please log in to view your worklog.
                    <p className="text-sm text-center">
                      <Link to="/" className="text-gray-600 hover:underline">
                        Login
                      </Link>
                    </p>
                  </div>
                }
              />
      </>    
          )}
            </Routes>
  <ToastContainer position="top-right" autoClose={3000} />
          </main>

    </div>
  )
}
export default App
