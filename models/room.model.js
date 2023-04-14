const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
    {
        roomNumber: {
            type: Number,
            required: true
        },
        bedCount: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },

        availability: {
            type: Boolean,
            required: true,
            default: true
        },
        availableAt: {
            type: Date,
            required: true,
            default: Date.now()
        },

        reservationId: {
            type: mongoose.Schema.Types.ObjectId,
        }

    },




    { collection: "Rooms" }
);





module.exports = mongoose.model("Room", roomSchema);