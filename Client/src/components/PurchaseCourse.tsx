import React from 'react';
import CourseCards from './CourseCard';

interface PurchaseCourseProps {
    userId: string; // Assuming you pass userId as a prop
}

const PurchaseCourse: React.FC<PurchaseCourseProps> = ({ userId }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
            <CourseCards userId={userId} />
        </div>
    );
};

export default PurchaseCourse;
