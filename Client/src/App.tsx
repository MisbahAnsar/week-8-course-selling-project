import React, { Suspense, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import PurchaseCourse from './components/PurchaseCourse';
import PurchaseCoursePage from './pages/PurchaseCoursePage'; // Import the new PurchaseCoursePage

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
                <Route path="/purchase" element={isAuthenticated ? <PurchaseCourse userId={userId!} /> : <Navigate to="/signin" />} />
                <Route path="/purchase-course" element={<PurchaseCoursePage />} /> {/* Add the route for PurchaseCoursePage */}
            </Routes>
        </Suspense>
    );
};

export default App;
