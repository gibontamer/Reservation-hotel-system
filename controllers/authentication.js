const Token = require("../models/token.model");
const Employee = require("../models/employee.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.createPassword = async (req, res) => {
    const { password, confirmPassword,
    } = req.body;
    const { token } = req.params;
    try {
        const tokenExist = await Token.findOne({ token });
        if (tokenExist) {
            const employee = await Employee.findById(tokenExist.userId);
            if (employee) {
                if (password === confirmPassword) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    employee.password = hashedPassword;
                    await employee.save();
                    await tokenExist.remove();
                    res.status(200).json({
                        message: "Password created",
                    });
                } else {
                    res.status(400).json({
                        message: "Password does not match",
                    });
                }
            } else {
                res.status(404).json({
                    message: "Employee not found",
                });
            }
        } else {
            res.status(404).json({
                message: "Token not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

exports.login = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const { email, password } = req.body;
    try {
        const employee = await Employee.findOne({ email });
        if (employee) {
            const isMatch = await bcrypt.compare(password, employee.password);
            if (isMatch) {
                const token = jwt.sign({
                    id: employee._id,
                    role: employee.role,
                }, process.env.JWT_SECRET, {
                    expiresIn: "24h"
                });


                res.status(200).json({
                    message: "Login successful",
                    token: `Bearer ${token}`,
                    role: employee.role,
                    fullname: employee.fullname,
                });
            } else {
                res.status(400).json({
                    message: "Incorrect password",
                });
            }
        } else {
            res.status(404).json({
                message: "Employee not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
}

