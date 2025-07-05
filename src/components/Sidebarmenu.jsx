import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

function Sidebarmenu() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hideSidebar = ['/', '/sign-up'].includes(location.pathname);

  if (hideSidebar || !user) return null;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Sidebar Toggle Button (Mobile Only) */}
     {isOpen ? <button
        className="fixed z-50 p-2 text-white bg-gray-800 rounded-md dark:text-black lg:hidden top-4 left-52 dark:bg-gray-200"
        onClick={toggleSidebar}
      > <X size={20} /> 
      </button> :
      <button
        className="fixed z-50 p-2 text-white bg-gray-800 rounded-md dark:text-black dark:bg-gray-200 lg:hidden top-4 left-4"
        onClick={toggleSidebar}
      ><Menu size={20} />
      </button>
}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 dark:bg-gray-200 dark:text-black text-white p-4 space-y-4 z-40 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}
      >
        <h2 className="p-2 mb-4 text-xl font-bold">Menu</h2>
        <ul className="space-y-2">
          {[
            { label: 'Dashboard', to: '/dashboard' },
            { label: 'Work Tracker', to: '/work-tracker' },
            { label: 'Work Log', to: '/work-log' },
            { label: 'Goals', to: '/goals' },
            { label: 'Profile', to: '/profile' },
            { label: 'Logout', to: '/logout', extra: 'text-red-400' },
          ].map(({ label, to, extra = '' }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `block p-2 rounded transition ${
                    isActive ? 'bg-gray-400 text-white dark:text-black  font-semibold' : 'hover:bg-gray-400'
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
    </div>
  );
}

export default Sidebarmenu;
