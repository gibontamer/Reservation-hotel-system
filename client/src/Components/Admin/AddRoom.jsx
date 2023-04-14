import { React, useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Header from "../Header";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const navigate = useNavigate();

  const [room, setRoom] = useState({});
  const randomValues = () => {
    const number = Math.floor(Math.random() * 300) + 1;
    const prices = [20, 50, 90, 25, 100, 200, 300, 250, 80, 230, 350, 400, 500];
    const price = prices[Math.floor(Math.random() * prices.length)];
    const capacity = Math.floor(Math.random() * 8) + 1;
    setRoom({
      roomNumber: number,
      price: price,
      bedCount: capacity,
    });
  };

  const { roomNumber = 0, bedCount = 0, price = 0 } = room;
  const handleSubmit = async (e) => {
    randomValues();
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/admin/room/create", room)
      .then((res) => {
        const data = res.data;
      });
  };

  return (
    <>
      <Header
        title="Add room"
        icon={
          <AddBusinessIcon
            color="primary"
            sx={{
              width: "70%",
              height: "70%",
            }}
          />
        }
      />
      <Grid item xs={12}>
        <Container maxWidth="sm">
          <Paper elevation={12}>
            <Box p={2.5} component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" align="center">
                Room Number
              </Typography>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  InputProps={{ inputProps: { min: 0, max: 500 } }}
                  size="small"
                  align="center"
                  label="e.g. 1, 1-10"
                  variant="outlined"
                  value={roomNumber}
                  onChange={(e) =>
                    setRoom({ ...room, roomNumber: e.target.value })
                  }
                />
              </Grid>
              <Typography variant="h6" align="center">
                Bed Count
              </Typography>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  type="number"
                  size="small"
                  value={bedCount}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) =>
                    setRoom({ ...room, bedCount: e.target.value })
                  }
                />
              </Grid>
              <Typography variant="h6" align="center">
                Price
              </Typography>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField
                  type="number"
                  size="small"
                  value={price}
                  helperText="Please enter the price in USD"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => setRoom({ ...room, price: e.target.value })}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  size="large"
                  onClick={handleSubmit}
                >
                  Add Room
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </>
  );
};

export default AddRoom;
