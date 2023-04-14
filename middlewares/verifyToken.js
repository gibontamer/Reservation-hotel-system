const jwt = require('jsonwebtoken');
const Employee = require('../models/employee.model');



const verifyRole = (role) => async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.findById(decoded.id);
    if (employee.role === role) {
      req.token = decoded;
      next();
    } else {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.verifyAdmin = verifyRole("admin");
exports.verifyReceptionist = verifyRole("receptionist");