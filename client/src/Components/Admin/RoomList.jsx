import React, { useState, useEffect } from "react";
import Header from "../Header";
import ClearIcon from "@mui/icons-material/Clear";
import { Grid, IconButton, Paper, Tooltip } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/room/list").then((res) => {
      res.data.rooms.forEach((room) => {
        room.createdAt = new Date(room.createdAt).toLocaleDateString();
      });
      setRooms(res.data.rooms);
    });
  }, []);
  const columns = [
    {
      name: "Room number",
      selector: (row) => row.roomNumber,
      sortable: true,
    },
    {
      name: "Beds",
      selector: (row) => row.bedCount,
      sortable: true,
    },

    {
      name: "Room price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Availability",
      selector: (row) => row.availability,
      sortable: true,
      cell: (row) => (
        <div
          style={{
            color:
              row.availability === true
                ? "green"
                : row.availability === undefined
                ? "green"
                : "red",
          }}
        >
          {row.availability === true
            ? "Available"
            : row.availability === undefined
            ? "Available"
            : "Not Availabe"}
        </div>
      ),
    },
    {
      name: "Estimated date of check-out",
      selector: (row) => row.availableAt,
      sortable: true,
      cell: (row) => (
        <div>
          {// if avaibaility is Available then dont show the date
          row.availability === true
            ? "Available"
            : row.availability === undefined
            ? "Available"
            : new Date(row.availableAt).toLocaleDateString()
            
          }


        </div>
      ),
    },

    {
      name: "Action",
      selector: (row) => row._id,
      sortable: true,
      cell: (row) => (
        <div>
          <Tooltip title="Remove room">
            <IconButton
              onClick={() => {
                axios
                  .delete(
                    `http://localhost:5000/api/admin/room/delete/${row._id}`
                  )
                  .then((res) => {
                    enqueueSnackbar(res.data.message, {
                      variant: "success",
                    });
                    setRooms(rooms.filter((room) => room._id !== row._id));
                  })
                  .catch((err) => {
                    enqueueSnackbar(err.response.data.message, {
                      variant: "error",
                    });
                  });
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <>
      <Header
        title="Room List"
        icon={
          <ViewListIcon
            color="primary"
            sx={{
              width: "70%",
              height: "70%",
            }}
          />
        }
      />
      <Grid item xs={12}>
        <Paper elevation={12}>
          <DataTable
            columns={columns}
            data={rooms}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 20]}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default RoomList;
