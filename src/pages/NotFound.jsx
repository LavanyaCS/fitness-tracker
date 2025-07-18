import React from 'react';
import NotFoundImage from '../assets/page-not-found.png'; // ✅ correct default import
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-white dark:bg-gray-900">
      <img src={NotFoundImage} alt="Page Not Found" className="max-w-full mb-8 w-96" />
      <h1 className="mb-2 text-4xl font-bold text-gray-800 dark:text-white">404 - Page Not Found</h1>
      <p className="mb-4 text-gray-500 dark:text-gray-300">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link  to="/dashboard"
        className="px-6 py-2 text-white transition bg-gray-800 rounded hover:bg-gray-900"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound;
