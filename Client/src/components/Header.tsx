import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is signed in by looking for a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is signed in
    }
  }, []);

  const handleSignUp = () => {
    navigate('/signup'); // Update this path to your signup route
  };

  const handleSignIn = () => {
    navigate('/signin'); // Update this path to your signin route
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Clear the token when signing out
    setIsLoggedIn(false); // Update state to show Sign in/Sign up buttons again
    navigate('/'); // Navigate to the main page after sign-out
  };

  const handleMyCourses = () => {
    if (isLoggedIn) {
      navigate('/mycourses'); // Navigate to the MyCourses page
    } else {
      alert('Please sign in to view your purchased courses.');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">EduPlatform</span>
          </div>
          <nav className="md:flex space-x-10">
            <a
              onClick={handleMyCourses}
              className="text-base font-medium text-gray-500 hover:text-gray-900">MyCourses</a>
            <a className="text-base font-medium text-gray-500 hover:text-gray-900">About</a>
            <a className="text-base font-medium text-gray-500 hover:text-gray-900">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Conditionally render Sign in/Sign up or Sign out */}
            {!isLoggedIn ? (
              <>
                <a
                  onClick={handleSignIn}
                  href="#"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </a>
                <a
                  onClick={handleSignUp}
                  href="#"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign up
                </a>
              </>
            ) : (
              <a
                onClick={handleSignOut}
                href="#"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign out
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
