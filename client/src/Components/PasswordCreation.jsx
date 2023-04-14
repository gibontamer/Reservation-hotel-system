import React, { useState, useEffect } from "react";
import {
  Paper,
  Container,
  CssBaseline,
  TextField,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import { useParams, useNavigate } from "react-router-dom";
const PasswordCreation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [newPassword, setPassword] = useState({});
  const { password = "", confirmPassword = "" } = newPassword;
  const [error, setError] = useState("");

  const useStyles = makeStyles((theme) => ({
    success: {
      color: "#4caf50",
    },
  }));

  const classes = useStyles();
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-password/" + token,
        newPassword
      );
      setError("");
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper elevation={12}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 3,
              mt: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{
                margin: "1rem",
              }}
            >
              Create Password
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              name="password"
              onChange={(e) =>
                setPassword({ ...newPassword, password: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={(e) =>
                setPassword({ ...newPassword, confirmPassword: e.target.value })
              }
            />
            {error ? (
              <Typography
                variant="body2"
                color="error"
                sx={{
                  margin: "1rem",
                }}
              >
                {error}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                className={classes.success}
                sx={{
                  margin: "1rem",
                }}
              >
                {success}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="large"
            >
              Submit Password
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PasswordCreation;
