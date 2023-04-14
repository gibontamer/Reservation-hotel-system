const Room = require('../models/room.model');

exports.createRoom = async (req, res) => {
    const { roomNumber, price, bedCount } = req.body;

    const bedValidation = /^\d{1,2}$/;
    const roomValidation = /^\d{1,3}-\d{1,3}$/;
    const roomSingleValidation = /^\d{1,3}$/;
    if (roomValidation.test(roomNumber) && bedValidation.test(bedCount) && price > 0) {
        const roomNumbers = roomNumber.split('-')
        const roomNumberStart = parseInt(roomNumbers[0]);
        const roomNumberEnd = parseInt(roomNumbers[1]);
        for (let i = roomNumberStart; i <= roomNumberEnd; i++) {
            const roomExist = await Room.aggregate([
                { $match: { "roomNumber": i } },
                { $count: "count" }
            ]);
            if (roomExist.length > 0) {
                res.status(501).json({
                    message: "Room in range already exists",
                })
                return;
            }
        }
        for (let i = roomNumberStart; i <= roomNumberEnd; i++) {
            const newRoom = new Room({
                roomNumber: i,
                bedCount: bedCount,
                availability: true,
                availableAt: Date.now(),
                price: price
            }
            );
            await newRoom.save();
        }
        res.status(200).json({
            message: "Rooms created successfully"
        })
    }
    else if (roomSingleValidation.test(roomNumber) && bedValidation.test(bedCount) && price > 0) {
        const room = await Room.findOne({ roomNumber: roomNumber });
        if (!room) {
            const newRoom = new Room({
                roomNumber: roomNumber,
                bedCount: req.body.bedCount,
                availability: true,
                availableAt: Date.now(),
                price: price
            });
            await newRoom.save();
            res.status(200).json({
                message: "Room created successfully"
            })
        } else {
            res.status(501).json({
                message: "Room already exists"
            })
        }
    } else {
        res.status(400).json({
            message: "Invalid room number or bed count"
        })
    }

}

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({
            message: "Rooms fetched successfully",
            rooms
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }

}