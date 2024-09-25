// comeback here later for adminId line 105

const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const generateToken = require('../auth/generateToken');
const adminAuth = require('../auth/adminAuth')
const bcrypt = require("bcrypt");

adminRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
    try {
        console.log("Hey")
        const Admin = await adminModel.findOne({ email });
        if(Admin){
            return res.status(400).json({
                message: "Admin already exists with this email"
            });
        }
        saltAround = 10;
        const salt = await bcrypt.genSalt(saltAround)
        const hashPassword = await bcrypt.hash(password, salt);
        const newAdmin = new adminModel({
            email,
            password: hashPassword,
            firstName,
            lastName,
        });

        await newAdmin.save();

        const token = generateToken(newAdmin);

        res.status(201).json({
            token,
            Admin:{
                id: newAdmin._id,
                email: newAdmin.email,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
            },
            message: "Admin signed up successfully"
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message:"server error"
        })
    }
})

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const Admin = await adminModel.findOne({ email });
        if(!Admin){
            return res.status(400).json({
                message:"email or password is not valid, please try again"
            });
        }

        const isMatch = await bcrypt.compare(password, Admin.password);
        if(!isMatch){
            return res.status(400).json({
                message: "email or password is not valid, please try again"
            });
        }

        const token = generateToken(Admin);

        res.json({
            token,
            Admin: {
                id: Admin._id,
                email: Admin.email,
                firstName: Admin.firstName,
                lastName: Admin.lastName,
            }
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        })
    }
})

adminRouter.post("/course", adminAuth, async (req, res) => {
    const { title, description, price, imageUrl } = req.body;

    const input = { title, description, price, imageUrl };
    if(!input){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    try{
        const newCourse = new courseModel({
            title,
            description,
            price,
            imageUrl,
            creatorId: req.adminId  // comeback here later for adminId
        });

        await newCourse.save();

        res.status(201).json({
            message: "Course created successfully",
            course: {
                id: newCourse._id,
                title: newCourse.title,
                description: newCourse.description,
                price: newCourse.price,
                imageUrl: newCourse.imageUrl,
            }
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Server error while creating course"
        });
    }
})

adminRouter.put("/course/:id", adminAuth, async (req, res) => {
    const courseId = req.params.id;
    const { title, description, price, imageUrl } = req.body;

    const input = { title, description, price, imageUrl };

    if(!input){
        return res.status(404).json({
            message: "At least one field must be updated"
        })
    }

    try{
        const updatedCourse = await courseModel.findByIdAndUpdate(
            courseId,
            input,
            {new: true, runValidators: true}
        );

        if(!updatedCourse){
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course updated successfully.",
            course: {
                id: updatedCourse._id,
                title: updatedCourse.title,
                description: updatedCourse.description,
                price: updatedCourse.price,
                imageUrl: updatedCourse.imageUrl,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while updating the course."
        });
    }
})

adminRouter.get("/course/bulk", async (req, res) => {
    try {
        const courses = await courseModel.find({ creatorId: req.adminId });

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
            message: "Server error while retrieving courses",
        });
    }
})

module.exports = {
    adminRouter: adminRouter
}

// {
//   "title": "EphhhicSsdjgvdfhitmeow",
//   "description": "This is elon musk",
//   "price": 99.929,
//   "imageUrl": "https://up.yimg.com/ib/th?id=OIP.U_VJuupQohwnzXcKMztqWgHaEo&pid=Api&rs=1&c=1&qlt=95&w=148&h=92"
// }
