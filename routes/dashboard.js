const express = require("express");
const router = express.Router();
const { getPersonalData, getOverallData } = require("../controllers/dashboard");
const { authUser } = require("../controllers/authentication");
const { authAdmin } = require("../controllers/authentication");
const { verifyReceptionist, verifyAdmin } = require("../middlewares/verifyToken");

router.get("/dashboard/data", verifyReceptionist, getPersonalData);
router.get("/dashboard/data/all", verifyAdmin, getOverallData);

module.exports = router;
