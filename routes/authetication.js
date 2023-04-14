const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");

router.post("/create-password/:token", authentication.createPassword);
router.post("/login", authentication.login);



module.exports = router;
