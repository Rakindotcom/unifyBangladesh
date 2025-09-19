import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`animate-spin rounded-full border-b-2 border-orange-500 ${sizeClasses[size]} mb-3`}></div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Loading;