import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white text-orange-500 px-4">
      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <p className="mb-6 text-gray-600">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;