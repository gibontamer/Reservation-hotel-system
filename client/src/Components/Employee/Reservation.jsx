import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  Container,
} from "@mui/material";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:5000/api/reservation/id/" + id)
      .then((res) => {
        const data = res.data.reservation;
        const checkin = data.checkin.split("T")[0];
        const checkout = data.checkout.split("T")[0];
        setReservation({
          ...data,
          checkin,
          checkout,
        });
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <Header
        title={"Reservation #" + reservation._id}
        icon={
          <CheckIcon
            color="success"
            sx={{
              width: "70%",
              height: "70%",
            }}
          />
        }
      />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Box p={2.5}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography variant="h6">Name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {reservation.fullname}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6">Phone:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{reservation.phone}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6">Email:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{reservation.email}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">Check in:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {reservation.checkin}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">Check out:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {reservation.checkout}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6">Room Number:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {reservation.roomNumber}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6">Adults:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {reservation.adults}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="h6">Children:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {reservation.children}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h6">Price:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      ${reservation.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Reservation;
