const Reservation = require('../models/reservation.model');
const Room = require('../models/room.model');
const sendMail = require('../middlewares/sendEmail');
const createPdf = require('../middlewares/createPdf');



exports.createReservation = async (req, res) => {
    const { fullname, email, phone, adults, children, checkin, checkout, receptionist } = req.body;
    const total = Number(adults) + Number(children);
    const totalNights = Math.round((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
    if (new Date(checkin).toLocaleDateString() === new Date(checkout).toLocaleDateString() || new Date(checkout).getTime() < new Date(checkin).getTime()) {
        return res.status(400).json({
            message: 'Checkin and checkout must be different days and checkout must be later than checkin'
        });
    }


    try {
        const room = await Room.findOne({ bedCount: { $gte: total }, availability: true });

        if (room) {
            const roomPrice = room.price;
            const totalPrice = Number(totalNights) * Number(roomPrice);
            const reservation = new Reservation({
                receptionist,
                fullname,
                email,
                phone,
                adults,
                children,
                checkin,
                checkout,
                roomNumber: room.roomNumber,
                price: totalPrice,
                penalty: 0,
                active: true,
            });
            await reservation.save();
            await Room.findOneAndUpdate({ roomNumber: room.roomNumber }, { availability: false, reservationId: reservation._id });
            res.status(200).json({
                message: 'Reservation created successfully',
                reservation
            });
        } else {
            res.status(400).json({
                message: 'No available rooms'
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error'
        });
    }

};


exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({
            message: 'Reservations fetched successfully',
            reservations
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Fetching reservations failed'
        });
    }

};
exports.deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findById(id);
        if (reservation) {
            await reservation.remove();
            await Room.findOneAndUpdate({ roomNumber: reservation.roomNumber }, { availableAt: new Date(), availability: true, reservationId: null });
            res.status(200).json({
                message: 'Reservation deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Reservation not found'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Deleting reservation failed'
        });
    }

}
exports.getReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findById(id);
        if (reservation) {
            res.status(200).json({
                message: 'Reservation fetched successfully',
                reservation
            });
        } else {
            res.status(404).json({
                message: 'Reservation not found'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Fetching reservation failed'
        });
    }

}
exports.getCheckouts = async (req, res) => {
    try {
        const reservations = await Reservation.find({ active: true });
        const today = new Date();
        reservations.forEach(async (reservation) => {
            if (new Date(reservation.checkout) < today) {
                const totalNights = Math.round((today - new Date(reservation.checkout)) / (1000 * 60 * 60 * 24));
                const penalty = Number(reservation.price) * Number(totalNights) * 0.1;
                await Reservation.findByIdAndUpdate(reservation._id, { penalty: penalty });
            }
        });
        res.status(200).json({
            message: 'Checkouts fetched successfully',
            reservations
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Fetching checkouts failed'
        });
    }


}

exports.checkoutReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findById(id);
        if (reservation) {
            await Reservation.findByIdAndUpdate(reservation, { active: false });
            await Room.findOneAndUpdate({ roomNumber: reservation.roomNumber }, { availableAt: new Date(), availability: true, reservationId: null });
            res.status(200).json({
                message: 'Checkout successful'
            });
        } else {
            res.status(404).json({
                message: 'Checkout failed'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Deleting checkout failed'
        });
    }

}
exports.createInvoice = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findById(id);
        if (reservation) {


            createPdf(reservation);


            sendMail.sendEmailWithFile(reservation.email, 'Invoice', 'Invoice', "invoice.pdf");

            res.status(200).json({
                message: 'Invoice sent successfully'
            });
        } else {
            res.status(404).json({
                message: 'Wrong reservation id'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Creating invoice failed'
        });
    }
}
