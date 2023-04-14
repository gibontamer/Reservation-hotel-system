import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
const axios = require("axios").default;

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("role") === "receptionist") {
        navigate("/reservation/dashboard");
      } else if (localStorage.getItem("role") === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.fullname);
        localStorage.setItem("role", res.data.role);
        if (res.data.role === "receptionist") {
          navigate("/reservation/dashboard");
        } else if (res.data.role === "admin") {
          navigate("/admin/dashboard");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

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
            Sign in
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Sign
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
