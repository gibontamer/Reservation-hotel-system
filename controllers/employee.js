const Token = require("../models/token.model");
const mailSender = require("../middlewares/sendEmail");
const crypto = require("crypto");
const Employee = require("../models/employee.model");



exports.createEmployee = async (req, res) => {
    const {
        fullname,
        email,
        phone,
        city,
        address,
        role,
        gender
    } = req.body;
    try {
        const employee = await Employee.findOne({ email });
        if (employee) {
            res.status(400).json({
                message: "Employee already exists",
            });
        } else {
            const newEmployee = new Employee({
                fullname,
                email,
                phone,
                city,
                address,
                role,
                gender
            });
            const token = new Token({
                userId: newEmployee._id,
                token: crypto.randomBytes(16).toString("hex"),
            });


            const link = `http://localhost:3000/create-password/${token.token}`;
            await mailSender.sendEmail(newEmployee.email, "Create Password", link);
            await token.save();
            await newEmployee.save();
            return res.status(200).json({
                message: "Email with password creation link sent",
            });


        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Creating employee failed",
        });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json({
            employees,
        });
    } catch (error) {
        res.status(500).json({
            message: "Fetching employees failed",
        });
    }
}

exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByIdAndDelete(id);
        if (employee) {
            res.status(200).json({
                message: "Employee deleted successfully",
            });
        } else {
            res.status(400).json({
                message: "Employee does not exist",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Deleting employee failed",
        });
    }
}