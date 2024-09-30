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

export const fetchCourses = async () => {
    try {
      const response = await axios.get(`${COURSE_URL}allcourses`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data.message || 'Error fetching courses');
    }
};

export const fetchCourseById = async (courseId) => {
    // Assuming you make an API call to fetch a single course by its ID
    const response = await fetch(`${COURSE_URL}courses/${courseId}`);
    return await response.json();
  };
  
export const PurchasedCourses = async () => {
    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          throw new Error('No token found. User not authenticated.');
        }
    
        const response = await axios.get(`${API_URL}purchases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        return response.data.courses; // Return the purchased courses
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
        throw error; // Let the calling component handle the error
      }
}