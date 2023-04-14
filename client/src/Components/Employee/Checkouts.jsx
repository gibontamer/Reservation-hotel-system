import React, { useEffect, useState, useRef, componentDidMount } from "react";
import Header from "../Header";
import axios from "axios";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Grid, IconButton, Paper, Tooltip } from "@mui/material";
import DataTable from "react-data-table-component";
import CheckIcon from "@mui/icons-material/Check";
import CheckOutModal from "./CheckOutModal";
import { useSnackbar } from "notistack";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const Checkouts = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [checkouts, setCheckouts] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const handleOpen = (row) => {
    setRowData(row);

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios.get("http://localhost:5000/api/reservation/check-out").then((res) => {
      res.data.reservations.forEach((checkout) => {
        checkout.checkin = new Date(checkout.checkin).toLocaleDateString();
        checkout.checkout = new Date(checkout.checkout).toLocaleDateString();
        checkout.createdAt = new Date(checkout.createdAt).toLocaleDateString();
      });

      setCheckouts(res.data.reservations);
    });
  }, []);

  const columns = [
    {
      name: "Fullname",
      selector: (row) => row.fullname,
      sortable: false,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: false,
    },
    {
      name: "Room Number",
      selector: (row) => row.roomNumber,
      sortable: false,
    },
    {
      name: "Checkin",
      selector: (row) => row.checkin,
      sortable: true,
    },
    {
      name: "Checkout",
      selector: (row) => row.checkout,
      sortable: true,

      cell: (row) => <div>{row.checkout}</div>,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: false,
    },

    {
      name: "Penalty",
      selector: (row) => row.penalty,
      sortable: true,
    },

    {
      name: "Action",
      sortable: false,
      cell: (row) => (
        <Tooltip title="Checkout reservation">
          <IconButton
            color="success"
            onClick={() => {
              handleOpen(row);
            }}
          >
            <CheckIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  const handleConfirm = () => {
    axios
      .delete(`http://localhost:5000/api/reservation/check-out/${rowData._id}`)
      .then((res) => {
        enqueueSnackbar("Checkout successful", {
          variant: "success",
        });

        setCheckouts(
          checkouts.filter((checkout) => checkout._id !== rowData._id)
        );
      })
      .catch((err) => {
        if (err.response.data.message) {
          enqueueSnackbar("Checkout failed", {
            variant: "error",
          });
        }
      });
    handleClose();
  };

  return (
    <>
      <CheckOutModal
        data={rowData}
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
      <Header
        title="Checkouts"
        icon={
          <AssignmentTurnedInIcon
            color="primary"
            sx={{
              width: "70%",
              height: "70%",
            }}
          />
        }
      />
      <Grid item xs={12} height="100%">
        <Paper elevation={3}>
          <DataTable
            striped={true}
            columns={columns}
            data={checkouts}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 20]}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default Checkouts;
