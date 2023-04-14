const Reservation = require('../models/reservation.model');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee.model');

exports.getPersonalData = async (req, res) => {
    let decoded = req.token;
    console.log(decoded);   

    try {
        const employee = await Employee.findById(decoded.id);
        const reservations = await Reservation.find({ receptionist: employee.fullname });
        const totalReservations = await Reservation.aggregate([
            {
                $match: {
                    receptionist: employee.fullname
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },

                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.month": 1
                }
            }
        ]);

        const reservationsData = totalReservations.map(reservation => {
            return {
                month: new Date(0, reservation._id.month, 0).toLocaleString('en-us', { month: 'long' }),
                count: reservation.count
            }
        });

        const data = reservations.map(reservation => {
            return {
                price: reservation.price,
                penalty: reservation.penalty,
                createdAt: reservation.createdAt.toLocaleString('en-us', { month: 'long' })
            }

        }
        );
        const dataCleaned = data.reduce((acc, curr) => {
            const existing = acc.find(item => item.createdAt === curr.createdAt);
            if (existing) {
                existing.price += curr.price;
                existing.penalty += curr.penalty;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const dataCleanedSorted = dataCleaned.sort((a, b) => {
            return months.indexOf(a.createdAt) - months.indexOf(b.createdAt);
        });
        const earningsData = dataCleanedSorted.map(reservation => {
            return {
                month: reservation.createdAt,
                earnings: reservation.price + reservation.penalty
            }
        });
        const totalEarnings = earningsData.reduce((acc, curr) => {
            return acc + curr.earnings;
        }, 0);


        res.status(200).json({
            sales: earningsData,
            reservations: reservationsData,
            totalEarnings: totalEarnings
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


}

exports.getOverallData = async (req, res) => {

    try {

        const reservations = await Reservation.find({});
        const totalReservations = await Reservation.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },

                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.month": 1
                }
            }
        ]);

        const reservationsData = totalReservations.map(reservation => {
            return {
                month: new Date(0, reservation._id.month, 0).toLocaleString('en-us', { month: 'long' }),
                count: reservation.count
            }
        });

        const data = reservations.map(reservation => {
            return {
                price: reservation.price,
                penalty: reservation.penalty,
                createdAt: reservation.createdAt.toLocaleString('en-us', { month: 'long' })
            }

        }
        );

        const dataCleaned = data.reduce((acc, curr) => {
            const existing = acc.find(item => item.createdAt === curr.createdAt);
            if (existing) {
                existing.price += curr.price;
                existing.penalty += curr.penalty;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const dataCleanedSorted = dataCleaned.sort((a, b) => {
            return months.indexOf(a.createdAt) - months.indexOf(b.createdAt);
        });

        const earningsData = dataCleanedSorted.map(reservation => {
            return {
                month: reservation.createdAt,
                earnings: reservation.price + reservation.penalty
            }
        });

        const totalEarnings = earningsData.reduce((acc, curr) => {
            return acc + curr.earnings;
        }, 0);

        res.status(200).json({
            sales: earningsData,
            reservations: reservationsData,
            totalEarnings: totalEarnings
        });
    }

    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
