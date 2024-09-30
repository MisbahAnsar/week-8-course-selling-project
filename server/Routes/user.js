const Router = require('express');
const bcrypt = require('bcrypt');
const { userModel, purchaseModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');
const generateToken = require('../auth/generateToken');

const userRouter = Router();

userRouter.post("/signin", async (req, res)=>{
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(400).json({
                message:"email or password is not valid, please try again"
            });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "email or password is not valid, please try again"
            });
        }

        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        })
    }
})

userRouter.post("/signup", async (req, res)=>{
    const { email, password, firstName, lastName } = req.body;
    
    try {
        console.log("Hey")
        const user = await userModel.findOne({ email });
        if(user){
            return res.status(400).json({
                message: "user already exists with this email"
            });
        }
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            email,
            password: hashPassword,
            firstName,
            lastName,
        });

        await newUser.save();

        const token = generateToken(newUser);

        res.status(201).json({
            token,
            user:{
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            },
            message: "User signed up successfully"
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message:"server error"
        })
    }
})

userRouter.get("/purchases", async (req, res) => {
    try {
        // Extract userId from the JWT token
        const token = req.headers.authorization.split(" ")[1]; // Assuming Bearer token
        const decoded = jwt.verify(token, process.env.SECRET);
        const userId = decoded.id; // Get userId from the token

        // Fetch the purchases for the user
        const purchases = await purchaseModel.find({ userId });
        if (!purchases.length) {
            return res.status(404).json({ message: "No purchases found for this user." });
        }

        // Get course details for the purchased courses
        const courseIds = purchases.map(purchase => purchase.courseId);
        const courses = await courseModel.find({ _id: { $in: courseIds } });

        // Map the results to include necessary course details
        const purchasedCourses = courses.map(course => ({
            id: course._id,
            title: course.title,
            description: course.description,
            price: course.price,
            imageUrl: course.imageUrl,
        }));

        res.status(200).json({
            message: "Purchased courses retrieved successfully",
            courses: purchasedCourses,
        });
    } catch (error) {
        console.error("Error while retrieving purchases:", error);
        res.status(500).json({ message: "Server error while retrieving purchases" });
    }
});


module.exports = {
    userRouter: userRouter
}