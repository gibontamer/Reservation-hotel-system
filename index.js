const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const reservationRouter = require("./routes/reservation");
const roomRouter = require("./routes/room");
const employeeRouter = require("./routes/employee");
const authenticationRouter = require("./routes/authetication");
const dashboardRouter = require("./routes/dashboard");

app.use(cors())
app.use(express.json())
require('dotenv').config()

app.use("/api/admin", roomRouter, employeeRouter);
app.use("/api/", authenticationRouter);
app.use("/api/reservation", reservationRouter, dashboardRouter);




mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PW}@hotel.5b6re.mongodb.net/Hotel?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("MongoDB connected");
        }
    }
);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
