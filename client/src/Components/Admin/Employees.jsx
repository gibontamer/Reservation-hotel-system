import React, { useState, useEffect } from "react";
import ListIcon from "@mui/icons-material/List";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useSnackbar } from "notistack";
import { Grid, IconButton, Paper, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    axios.get("http://localhost:5000/api/admin/employee/list").then((res) => {
      res.data.employees.forEach((employee) => {
        employee.createdAt = new Date(employee.createdAt).toLocaleDateString();
      });
      setEmployees(res.data.employees);
    });
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      cell: (row) => (
        <div
          style={{
            color: row.gender === "Man" ? "blue" : "rgb(222 11 116)",
          }}
        >
          {row.gender === "Man" ? "Man" : "Woman"}
        </div>
      ),
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Employee since",
      selector: (row) => row.createdAt,

      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => row._id,
      cell: (row) => (
        <div>
          <Tooltip title="Delete">
            <IconButton
              color="warning"
              onClick={() => {
                axios
                  .delete(
                    `http://localhost:5000/api/admin/employee/delete/${row._id}`
                  )
                  .then((res) => {
                    enqueueSnackbar(res.data.message, {
                      variant: "success",
                    });
                   
                    setEmployees(employees.filter((employee) => employee._id !== row._id));
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
        title="Employees"
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
          <DataTable striped={true} columns={columns} data={employees} />
        </Paper>
      </Grid>
    </>
  );
};

export default EmployeeList;
