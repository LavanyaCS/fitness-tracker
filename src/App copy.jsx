import { useState } from 'react'
import './App.css'
import { Routes,Route} from 'react-router-dom'
import Sidebarmenu from './components/Sidebarmenu'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Profile from 
function App() {
 

  return (
      <div className="min-h-screen bg-gray-50">
        <AuthForm />
        <div className="sidebar w-48">
          <Sidebarmenu />
        </div>
        <div className="flex-1 ">
          <Routes>
            <Route to="/"  element={<Dashboard />}></Route>
            <Route to="/weight-tracker" element={<Worktracker />}></Route>
            <Route to="/Goals" element={<Goals />}></Route>
            <Route to="/Profile" element={<Profile />}></Route>
            <Route to="/work-log" element={<Worklog />}></Route>
            <Route to="/Logout" element={<Dashboard />}></Route>
          </Routes>
        </div>
      </div>
  )
}
import AuthForm from './pages/Auth/AuthForm'

export default App
