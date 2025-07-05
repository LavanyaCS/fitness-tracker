import { Link, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Dashboard from './pages/Dashboard';
import Worktracker from './pages/Worktracker';
import Worklog from './pages/Worklog';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import Logout from './pages/Auth/Logout';
import Sidebarmenu from './components/Sidebarmenu';
import Thememode from './components/Thememode';

function App() {

  return (
     <div className="flex min-h-screen transition-colors duration-300 ">
     <Thememode  />

    

      <Sidebarmenu />

      {/* Main Content */}
      <main className="flex-1 min-h-screen text-black bg-gray-50 dark:bg-white/20 dark:text-gray-900">
         <div className="flex px-8 pt-16 pb-8 transition-colors duration-300 ">
   
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/work-tracker" element={<Worktracker />} />
          <Route path="/work-log" element={<Worklog />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
   </div>   </main>
    </div>
  )
}
export default App
