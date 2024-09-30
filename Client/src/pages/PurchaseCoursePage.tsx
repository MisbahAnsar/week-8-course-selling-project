// import React, { useState, useEffect } from 'react';
// import { purchaseCourse, fetchCourses } from '../utils/index';
// import { useNavigate } from 'react-router-dom';

// const PurchaseCoursePage: React.FC = () => {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
  
//   // Retrieve both userId and courseId from localStorage
//   const userId = localStorage.getItem('userId');
//   const courseId = localStorage.getItem('courseId'); // Assuming you want to use this later

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch available courses
//     const loadCourses = async () => {
//       try {
//         const data = await fetchCourses();
//         setCourses(data.courses);
//       } catch (err) {
//         setError('Failed to load courses');
//       }
//     };

//     loadCourses();
//   }, []);

//   const handlePurchase = async (courseId: string) => {
//     const token = localStorage.getItem('token');
//         if (!token) {
//         setError('Please log in to purchase a course.');
//         alert("Your order has been purchased")
//         return;
//     }

//     setLoadingCourseId(courseId);
//     setError(null);

//     try {
//       await purchaseCourse(courseId, userId);
//       alert('Course purchased successfully!');
//       navigate('/purchase/confirmation');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoadingCourseId(null);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-bold">Purchase a Course</h1>
      
//       {error && <p className="text-red-500">{error}</p>}
      
//       {loadingCourseId ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//           {courses.map((course) => (
//             <div key={course.id} className="border p-4 rounded">
//               <h2 className="text-xl font-semibold">{course.title}</h2>
//               <p>{course.description}</p>
//               <p className="mt-2 font-bold">Price: ${course.price}</p>
//               <button
//                 className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
//                 onClick={() => handlePurchase(course.id)}
//                 disabled={loadingCourseId === course.id}
//               >
//                 {loadingCourseId === course.id ? 'Purchasing...' : 'Purchase Course'}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PurchaseCoursePage;
