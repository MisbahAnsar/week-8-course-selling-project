// PurchasingCourse.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface PurchasingCourseProps {
    course: Course;
    userId: string;
}

const PurchasingCourse: React.FC<PurchasingCourseProps> = ({ course, userId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConfirmPurchase = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/user/courses/purchases', {
                courseId: course._id,
                userId
            });
            alert(response.data.message); // Show success message
        } catch (err: any) {
            console.error('Error purchasing course:', err.response ? err.response.data : err);
            setError('Error purchasing course');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="purchasing-course-container">
            <h1>${course._id}</h1>
            <h2 className="text-2xl font-bold">Purchase {course.title}</h2>
            <p className="text-gray-700">{course.description}</p>
            <p className="text-green-600 font-semibold">${course.price.toFixed(2)}</p>

            {error && <p className="text-red-500">{error}</p>}

            <button
                onClick={handleConfirmPurchase}
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition-colors'}`}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Confirm Purchase'}
            </button>
        </div>
    );
};

export default PurchasingCourse;
