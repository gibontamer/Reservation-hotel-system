import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Box,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const axios = require("axios").default;
const CreateUser = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/admin/employee/create", user)
      .then((res) => {
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [user, setUser] = useState([]);
  const {
    fullname = "",
    email = "",
    city = "",
    address = "",
    role = "",
    gender = "",
    phone = "",
  } = user;
  return (
    <>
      <Header
        title="Add Employee"
        icon={
          <PersonAddAltIcon
            color="primary"
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
          mt: 8,
        }}
      >
        <Paper elevation={3}>
          <Box p={5} component="form" onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Full Name"
                  fullWidth
                  value={fullname}
                  onChange={(e) =>
                    setUser({ ...user, fullname: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="Phone"
                  label="Phone Number"
                  fullWidth
                  value={phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  name="city"
                  label="City"
                  fullWidth
                  value={city}
                  onChange={(e) => setUser({ ...user, city: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="address"
                  label="Address"
                  fullWidth
                  value={address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    label="Role"
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                  >
                    <MenuItem value={"receptionist"}>Receptionist</MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={gender}
                    label="Gender"
                    onChange={(e) =>
                      setUser({ ...user, gender: e.target.value })
                    }
                  >
                    <MenuItem value={"Man"}>Man</MenuItem>
                    <MenuItem value={"Woman"}>Woman</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  component={Link}
                  to="/login"
                >
                  Create User
                  <Outlet />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default CreateUser;
