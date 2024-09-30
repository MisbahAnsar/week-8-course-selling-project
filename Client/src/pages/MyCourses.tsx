// components/MyCourses.js
import { useEffect, useState } from 'react';
import { PurchasedCourses } from '../utils'; // Utility to fetch courses

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const purchasedCourses = await PurchasedCourses();
        setCourses(purchasedCourses);
        setLoading(false);
      } catch (error) {
        setError('Failed to load purchased courses.');
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Purchased Courses</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <p className="text-xl font-semibold">${course.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses purchased yet.</p>
      )}
    </div>
  );
};

export default MyCourses;
