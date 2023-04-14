import React, { useState, useEffect } from "react";
import Header from "../Header";
import ClearIcon from "@mui/icons-material/Clear";
import { Grid, IconButton, Paper, Tooltip } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ListIcon from "@mui/icons-material/List";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useSnackbar } from "notistack";

const Reservations = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios.get("http://localhost:5000/api/reservation/list").then((res) => {
      res.data.reservations.forEach((reservation) => {
        reservation.checkin = new Date(
          reservation.checkin
        ).toLocaleDateString();
        reservation.checkout = new Date(
          reservation.checkout
        ).toLocaleDateString();
        reservation.createdAt = new Date(
          reservation.createdAt
        ).toLocaleDateString();
      });

      setReservations(res.data.reservations);
    });
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "10%",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      width: "10%",
    },
    {
      name: "Room #",
      selector: (row) => row.roomNumber,
      sortable: true,
      width: "6%",
    },
    {
      name: "Adults",
      selector: (row) => row.adults,
      sortable: true,
    },
    {
      name: "Children",
      selector: (row) => row.children,
      sortable: true,
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
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Penalty",
      selector: (row) => row.penalty,
      sortable: true,
    },

    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.active ? "Active" : "Checked Out"),
      cell: (row) => (
        <div
          style={{
            color: row.active ? "green" : "red",
          }}
        >
          {row.active ? "Active" : "Checked Out"}
        </div>
      ),

      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => row._id,
      sortable: false,
      cell: (row) => (
        <div>
          <Tooltip title="Delete reservation">
            <IconButton
              onClick={() => {
                axios
                  .delete(`http://localhost:5000/reservation/delete/${row._id}`)
                  .then((res) => {
                    enqueueSnackbar(`Reservation deleted`, {
                      variant: "success",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                const newReservations = reservations.filter(
                  (reservation) => reservation._id !== row._id
                );
                setReservations(newReservations);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send invoice on mail">
            <IconButton
              onClick={() => {
                axios
                  .get(
                    `http://localhost:5000/api/reservation/invoice/${row._id}`
                  )
                  .then((res) => {
                    enqueueSnackbar(`Invoice sent to ${row.email} `, {
                      variant: "success",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <InsertDriveFileIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header
        title="Reservations"
        icon={
          <ListIcon
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
            data={reservations}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 20]}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default Reservations;
