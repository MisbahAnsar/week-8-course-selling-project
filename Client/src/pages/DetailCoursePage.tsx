import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To access the courseId from the URL
import { fetchCourseById } from '../utils';
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp,  } from 'lucide-react';
import axios from 'axios'; // Import Axios for API requests

const CourseDetails = () => {
  const { courseId } = useParams(); // Get the courseId from the URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await fetchCourseById(courseId); // Fetch the course details by id
        setCourse(response.course); // Assuming the response has a 'course' field
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch course details');
        setLoading(false);
      }
    };

    getCourse();
  }, [courseId]);
  
  const handleEnroll = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Assuming 'userToken' is where the token is stored
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
  
    if (!token || !userId) {
      alert('You need to log in to enroll in this course.');
      return; // Stop if there's no token or userId
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3000/user/courses/purchase',
        {
          userId,
          courseId, // courseId comes from useParams()
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Attach token in Authorization header
          }
        }
      );
  
      if (response.status === 201) {
        setIsEnrolled(true); // If enrollment is successful, update button state
      }
    } catch (error) {
      console.error("Enrollment failed", error);
      alert('Enrollment failed. Please try again.');
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-gray-100 p-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_30px_rgba(0,0,0,0.2)] backdrop-blur-sm backdrop-filter"
      >
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          {course.title}
        </h1>
        <div className="relative w-full h-80 mb-6 rounded-xl overflow-hidden group">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-2xl font-bold">Explore Now</p>
          </div>
        </div>
        <p className="text-xl mb-6 text-gray-300">{course.description}</p>
        <div className="mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg hover:from-gray-700 hover:to-gray-600 transition-all duration-300"
            aria-expanded={isExpanded}
          >
            <span>Detailed Course Explanation</span>
            {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg text-gray-200"
            >
              {course.detailedExplanation}
            </motion.div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            ${course.price.toFixed(2)}
          </p>
          <button 
            onClick={handleEnroll}
            disabled={isEnrolled} 
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <span className="border-2 border-white/50 rounded-full px-4 py-1 shadow-inner">
              {isEnrolled ? 'Enrolled' : 'Enroll Now'}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetails;
