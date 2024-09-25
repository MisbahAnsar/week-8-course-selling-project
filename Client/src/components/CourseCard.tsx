import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

const CourseCards: React.FC<{ userId: string }> = ({ userId }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/courses/allcourses');
                localStorage.getItem('userId');
                if(userId){
                setCourses(response.data.courses);
                }
            } catch (err: any) {
                console.error('Error fetching courses:', err.response ? err.response.data : err);
                setError('Error fetching courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handlePurchase = (courseId: string) => {
        navigate(`/purchase-course`, { state: { courseId, userId } }); // Navigate to PurchaseCoursePage with courseId and userId
    };

    if (loading) return <div className="text-center">Loading courses...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
                <div className="border p-4 rounded shadow-lg transition-transform duration-300 hover:scale-105">
                    <h1  className='text-black text-2xl'>{course.id}</h1>
                    <img key={course.imageUrl} src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover rounded" />
                    <h3 key={course.title} className="text-xl font-bold mt-2">{course.title}</h3>
                    <p key={course.description} className="mt-1">{course.description}</p>
                    <p key={course.price} className="mt-2 text-green-500 font-semibold">${course.price.toFixed(2)}</p>
                    <button 
                        onClick={() => handlePurchase(course.id)} // Call handlePurchase with courseId
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition-colors"
                    >
                        Purchase Course
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CourseCards;
