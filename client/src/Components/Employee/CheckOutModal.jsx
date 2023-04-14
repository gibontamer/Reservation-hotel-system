import React from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  makeStyles,
  ListItem,
  List,
  Modal,
  Button,
  Box,
  Container,
} from "@mui/material";
const CheckOutModal = (props) => {
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "2rem",
            backgroundColor: "#fff",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Container maxWidth="sm">
            <Box>
              <Typography variant="h4">Confirm checkout</Typography>

              <Typography variant="h6">Name: {props.data.fullname}</Typography>

              <Typography variant="h6">
                Room Number: {props.data.roomNumber}
              </Typography>

              <Typography variant="h6">
                Checkin: {props.data.checkin}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                }}
              >
                Checkout:
                <span
                  style={{
                    marginLeft: "0.45rem",
                  }}
                >
                  {props.data.checkout}
                </span>
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  props.handleClose();
                  props.handleConfirm();
                }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "transparent",
                  color: "rgba(0, 0, 0, 0.8)",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    color: "rgba(0, 0, 0, 1)",
                    backgroundColor: "transparent",
                  },
                }}
                onClick={() => {
                  props.handleClose();
                }}
              >
                Cancel
              </Button>
            </Box>
          </Container>
        </Paper>
      </Modal>
    </>
  );
};

export default CheckOutModal;
