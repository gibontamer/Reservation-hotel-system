import { React, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Drawer,
  Toolbar,
  CssBaseline,
  Button,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminLayout from "./Admin/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import UserLayout from "./UserLayout";
const Layout = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            border: "none",
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              Hotel System
            </Typography>
          </Toolbar>
          {role === "admin" ? (
            <AdminLayout />
          ) : role === "receptionist" ? (
            <UserLayout />
          ) : (
            navigate("/login")
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1" color="info.main" align="center">
              {localStorage.getItem("role").toUpperCase()}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{
                position: "absolute",
                bottom: "0",
                margin: "1rem",
              }}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Outlet />
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
