// utils/index.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/user/'; // Adjust the URL based on your server
const COURSE_URL = 'http://localhost:3000/user/courses/'

export const signupUser = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
        const response = await axios.post(`${API_URL}signup`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.message || 'Error signing up');
    }
};

export const SigninUser = async (userData: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}signin`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.message || 'Error signing in');
    }
}

export const purchaseCourse = async (courseId: string, userId: string) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    try {
        const response = await axios.post(
            `${COURSE_URL}purchase`, 
            { courseId, userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data.message || 'Error purchasing course');
    }
};

// export const fetchCourseDetails = async (courseId: string) => {
//     const response = await axios.get(`${COURSE_URL}${courseId}`);
//     return response.data.course; // Return course data
// };


export const fetchCourses = async () => {
    try {
      const response = await axios.get(`${COURSE_URL}allcourses`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data.message || 'Error fetching courses');
    }
};

// export const adminSignup = async (adminData) => {
//     const response = await axios.post(`${API_URL}/admin/signup`, adminData);
//     return response.data;
// };

// export const adminSignin = async (adminData) => {
//     const response = await axios.post(`${API_URL}/admin/signin`, adminData);
//     return response.data;
// // };

// export const createCourse = async (courseData) => {
//     const response = await axios.post(`${API_URL}/admin/course`, courseData);
//     return response.data;
// };

// export const updateCourse = async (courseId, courseData) => {
//     const response = await axios.put(`${API_URL}/admin/course/${courseId}`, courseData);
//     return response.data;
// };

