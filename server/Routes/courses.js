const { Router } = require('express');
const { userModel, courseModel, purchaseModel } = require('../db');
const bcrypt = require('bcrypt');  // Not needed if you want to skip password validation
const adminAuth = require('../auth/adminAuth');

const coursesRouter = Router();

// Purchase a course based on userId and courseId
coursesRouter.post("/purchase", adminAuth, async (req, res) => {
    const { userId, courseId } = req.body;

    try {
        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if course exists
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const existingPurchase = await purchaseModel.findOne({ userId, courseId });
        if (existingPurchase) {
        return res.status(400).json({ message: "Course already purchased" });
        }

        // Proceed with the purchase
        const newPurchase = new purchaseModel({ userId, courseId });
        await newPurchase.save();

        res.status(201).json({
            message: "Course purchased successfully",
            purchase: newPurchase,
        });
    } catch (error) {
        console.error("Error while processing purchase:", error);
        res.status(500).json({ message: "Server error while processing purchase" });
    }
});

coursesRouter.get("/allcourses", async (req, res) => {
    try {
        // Fetch all courses from the database
        const courses = await courseModel.find();

        if (!courses || courses.length === 0) {
            return res.status(404).json({
                message: "No courses found"
            });
        }

        // Send the course data as a response
        res.status(200).json({
            message: "Courses retrieved successfully",
            courses: courses.map(course => ({
                id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                imageUrl: course.imageUrl,
            })),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while retrieving courses"
        });
    }
});

// Fetch course details by courseId
coursesRouter.get("/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;

    try {
        // Find the course by its ID
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Send the course data as a response
        res.status(200).json({ course });
    } catch (error) {
        console.error("Error while retrieving course details:", error);
        res.status(500).json({ message: "Server error while retrieving course details" });
    }
});


// Preview purchased courses for a user
coursesRouter.get("/preview", async (req, res) => {
    const userId = req.adminId;  // Assuming this comes from authentication middleware

    try {
        const purchases = await purchaseModel.find({ userId });
        if (!purchases.length) {
            return res.status(404).json({ message: "No purchased courses found" });
        }

        const courseIds = purchases.map(purchase => purchase.courseId);
        const courses = await courseModel.find({ _id: { $in: courseIds } });

        res.status(200).json({
            message: "Courses preview retrieved successfully",
            courses: courses.map(course => ({
                id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                imageUrl: course.imageUrl,
            })),
        });
    } catch (error) {
        console.error("Error while retrieving course previews:", error);
        res.status(500).json({ message: "Server error while retrieving course previews" });
    }
});

module.exports = {
    coursesRouter
};
