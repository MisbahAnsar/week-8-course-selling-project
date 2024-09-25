const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./Routes/user');
const { coursesRouter } = require('./Routes/courses');
const dotenv = require('dotenv');
const cors = require('cors');
const { adminRouter } = require('./Routes/admin');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/user', userRouter);
app.use('/user/courses', coursesRouter);
app.use('/user/admin', adminRouter);


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
};

connectDB();

app.listen(3000);