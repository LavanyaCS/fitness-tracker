import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import Thememode from './Thememode';

function Sidebarmenu() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hideSidebar = ['/login', '/signup', '/not-found','/','*'].includes(location.pathname);

  if (hideSidebar || !user) return null;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Sidebar Toggle Button (Mobile Only) */}
     {isOpen ? <button
        className="fixed z-50 p-2 text-gray-800 bg-gray-100 rounded-lg dark:text-white lg:hidden top-4 left-52 dark:bg-gray-900"
        onClick={toggleSidebar}
      > <X size={20} /> 
      </button> :
      <button
        className="fixed z-50 p-2 text-gray-800 bg-gray-100 rounded-lg dark:text-white dark:bg-gray-900 lg:hidden top-4 right-4"
        onClick={toggleSidebar}
      ><Menu size={20} />
      </button>
}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-900  text-gray-800 dark:text-white p-4 space-y-4 z-40 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}
      >
        <h2 className="p-2 mb-4 text-xl font-bold">FitTracker</h2>
        <ul className="space-y-2">
          {[
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Weight Tracker', to: '/weight-tracker' },
            { label: 'Work Log', to: '/work-log' },
            { label: 'Goals', to: '/goals' },
            { label: 'Profile', to: '/profile' },
            { label: 'Logout', to: '/logout' },
          ].map(({ label, to, extra = '' }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `block p-2 rounded-lg transition ${
                    isActive ? 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white  font-semibold' : 'hover:bg-gray-200 hover:dark:bg-gray-700 text-gray-800 dark:text-white'
                  } ${extra}`
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        
      </aside>
      <Thememode />
    </div>
  );
}

export default Sidebarmenu;
