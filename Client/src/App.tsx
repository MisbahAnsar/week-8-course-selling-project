import React, { Suspense, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import AllCourses from './pages/AllCourses';
import CourseDetails from './pages/DetailCoursePage';
import MyCourses from './pages/MyCourses';


const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignIn = (userId: string) => {
        setIsAuthenticated(true);
        setUserId(userId); // Store the userId received from Signin
        navigate('/purchase');
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin onSignIn={handleSignIn} />} />
                <Route path="/purchase" element={<AllCourses />} />
                <Route path='courses/:courseId' element={<CourseDetails />}/>
                <Route path='/mycourses' element={<MyCourses />}/>
            </Routes>
        </Suspense>
    );
};

export default App;
