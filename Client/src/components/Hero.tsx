import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Function to check if the user is logged in using token
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    // console.log(token)
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status on component mount
  }, []);

  const handleAllCourses = () => {
    console.log(isLoggedIn)
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      navigate('/purchase'); // Navigate to courses page if logged in
    } else {
      navigate('/signin'); // Redirect to sign-in if not logged in
    }
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <div className="mt-20 mx-auto max-w-7xl px-4 sm:mt-20 sm:px-6 md:mt-20 lg:mt-24 lg:px-8 xl:mt-32">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Unlock Your</span>
                <span className="block">Potential <span className="text-blue-600">with</span></span>
                <span className="block text-blue-600">EduPlatform</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover a world of knowledge with our expert-led courses. Learn at your own pace and advance your career.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    onClick={handleAllCourses}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Explore Courses
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;
