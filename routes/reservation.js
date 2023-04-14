const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation");
const { verifyReceptionist } = require("../middlewares/verifyToken");

router.post("/create", reservationController.createReservation);
router.get("/list", reservationController.getReservations);
router.get("/id/:id", reservationController.getReservation);
router.delete("/delete/:id", reservationController.deleteReservation);
router.get("/check-out", reservationController.getCheckouts);
router.delete("/check-out/:id", reservationController.checkoutReservation);
router.get("/invoice/:id", reservationController.createInvoice);

module.exports = router;



