import { useState, useEffect } from 'react';
import { fetchCourses } from '../utils'; // Assuming fetchCourses fetches the data
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetchCourses(); // Fetch courses
        setCourses(response.courses); // Update state with fetched courses
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  const handlePurchaseClick = (courseId) => {
    const token = localStorage.getItem('token')
    if(token){
        navigate(`/courses/${courseId}`); // Navigate to the course detail page with courseId
    } else{
        navigate('/signin')
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">All Courses</h1>
        {courses.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <li key={course.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  width={400}
                  height={225}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-primary-foreground">{course.title}</h2>
                  <p className="text-gray-400 mb-4">{course.description}</p>
                  <p className="text-lg font-bold text-primary">Price: ${course.price.toFixed(2)}</p>
                  <button 
                    className='border bg-blue-400 px-2 rounded-sm'
                    onClick={() => handlePurchaseClick(course.id)} // Pass the course id here
                  >
                    Purchase Now
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl text-gray-400">No courses available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
