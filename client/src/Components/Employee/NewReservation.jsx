import { React, useState, useEffect } from "react";
import { Grid, Paper, Box, TextField, Typography, Button } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const NewReservation = () => {
  useEffect(() => {
    const name = localStorage.getItem("name");
    setReservation({
      ...reservation,
      receptionist: name,
    });
  }, []);
  const navigate = useNavigate();

  const [reservation, setReservation] = useState({});
  const {
    receptionist = "",
    fullname = "",
    email = "",
    phone = "",
    adults = 0,
    children = 0,
    checkin = "",
    checkout = "",
    createdAt = "",
  } = reservation;

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const useStyles = makeStyles((theme) => ({
    success: {
      color: "#4caf50",
    },
  }));
  const classes = useStyles();

  const handleSubmit = async (e) => {
    console.log(reservation);

    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/reservation/create", reservation)
      .then((res) => {
        const data = res.data;
        if (data.message === "Reservation created successfully") {
          setError("");
          setReservation({});
          setSuccess(data.message);
        }

        navigate(`/reservation/id/${data.reservation._id}`);
      })
      .catch((err) => {
        if (err.response.data.message) {
          setError(err.response.data.message);
        }
      });
  };

  return (
    <>
      <Header
        title="New reservation"
        icon={
          <BookIcon
            color="primary"
            sx={{
              width: "70%",
              height: "70%",
            }}
          />
        }
      />
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ flexGrow: 0 }}>
          <Box p={2.5}>
            <Typography variant="h5" mb={2}>
              Personal information
            </Typography>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={2.5} justifyContent="center">
                <TextField
                  fullWidth
                  type="fullname"
                  label="Full Name"
                  value={fullname}
                  onChange={(e) =>
                    setReservation({
                      ...reservation,
                      fullname: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={2.5}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) =>
                    setReservation({ ...reservation, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone"
                  value={phone}
                  onChange={(e) =>
                    setReservation({ ...reservation, phone: e.target.value })
                  }
                />
              </Grid>
            </Grid>

            <Typography variant="h5" mb={2} mt={2}>
              Reservation information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="number"
                  id="children"
                  label="Children"
                  value={children}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) =>
                    setReservation({ ...reservation, children: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="number"
                  id="adults"
                  label="Adults"
                  value={adults}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) =>
                    setReservation({ ...reservation, adults: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  id="date"
                  label="Check in"
                  type="date"
                  value={checkin}
                  onChange={(e) => {
                    setReservation({ ...reservation, checkin: e.target.value });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  id="date"
                  label="Check out"
                  type="date"
                  value={checkout}
                  onChange={(e) => {
                    setReservation({
                      ...reservation,
                      checkout: e.target.value,
                    });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  size="large"
                  startIcon={<BookIcon />}
                >
                  Create Reservation
                </Button>
              </Grid>
              <Grid item xs={3}>
                {error ? (
                  <Typography
                    variant="body1"
                    color="error"
                    sx={{
                      margin: "1rem",
                    }}
                  >
                    {error}
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    className={classes.success}
                    sx={{
                      margin: "1rem",
                    }}
                  >
                    {success}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default NewReservation;
