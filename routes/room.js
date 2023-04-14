const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");

router.post("/room/create", roomController.createRoom);
router.get("/room/list", roomController.getRooms);

module.exports = router;