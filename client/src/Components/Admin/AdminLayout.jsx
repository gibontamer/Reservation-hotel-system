import { React, useEffect, useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Outlet } from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Link } from "react-router-dom";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { styled } from "@mui/material/styles";

const AdminLayout = () => {
  const CustomListItem = styled(ListItem)({
    borderRadius: "5px",
    marginLeft: "5px",
    "&:hover": {
      backgroundColor: "#edf0fa",
    },
  });
  return (
    <div>
      <List sx={{ overflow: "hidden" }}>
        <CustomListItem button to="dashboard/" component={Link}>
          <ListItemIcon>
            <EqualizerIcon color="active" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </CustomListItem>
        <CustomListItem button to="employee/create" component={Link}>
          <ListItemIcon>
            <PersonAddAltIcon color="active" />
          </ListItemIcon>
          <ListItemText primary="New employee" />
        </CustomListItem>
        <CustomListItem button to="employee/list" component={Link}>
          <ListItemIcon>
            <ViewListIcon color="active" />
          </ListItemIcon>
          <ListItemText primary="Employee list" />
        </CustomListItem>
        <CustomListItem button to="room/add" component={Link}>
          <ListItemIcon>
            <AddBusinessIcon color="active" />
          </ListItemIcon>
          <ListItemText primary="Add room" />
        </CustomListItem>
        <CustomListItem button to="room/list" component={Link}>
          <ListItemIcon>
            <ViewListIcon color="active" />
          </ListItemIcon>
          <ListItemText primary="Room list" />
        </CustomListItem>
      </List>
    </div>
  );
};

export default AdminLayout;
