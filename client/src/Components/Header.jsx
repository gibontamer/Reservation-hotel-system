import React from "react";
import { Paper, Box, Grid, Typography, Button, TextField } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";

const Header = (props) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        flexGrow: 1,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          mb: 2,
          maxHeight: 300,
        }}
      >
        <Box p={2.5} sx={{}}>
          <Grid
            container
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              xs={1}
              sx={{
                borderRight: "1px solid rgba(0, 0, 0, 0.5)",
              }}
            >
              {props.icon}
            </Grid>

            <Grid item xs={11}>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  ml: 2,
                }}
              >
                {props.title}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Header;
