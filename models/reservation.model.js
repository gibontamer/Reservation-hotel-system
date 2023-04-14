const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(

    {


        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        adults: {
            type: Number,
            required: true
        },
        children: {
            type: Number,
            required: true
        },
        checkin: {
            type: Date,
            required: true
        },
        checkout: {
            type: Date,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now

        },
        roomNumber: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },

        penalty: {
            type: Number,
            default: 0

        },
        active: {
            type: Boolean,
            default: true
        },
        receptionist: {
            type: String,
        },
    },

    { collection: "Reservations" }
);

module.exports = mongoose.model("Reservation", reservationSchema);