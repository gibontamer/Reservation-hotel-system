const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee");
const { verifyAdmin } = require("../middlewares/verifyToken");

router.post("/employee/create", verifyAdmin, employeeController.createEmployee);
router.get("/employee/list", verifyAdmin, employeeController.getEmployees);
router.delete("/employee/delete/:id", verifyAdmin, employeeController.deleteEmployee);

module.exports = router;

