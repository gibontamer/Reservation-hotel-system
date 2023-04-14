import { React } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import { Link } from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ListIcon from "@mui/icons-material/List";

import { styled } from "@mui/material/styles";

const CustomListItem = styled(ListItem)({
  borderRadius: "5px",
  marginLeft: "5px",
  "&:hover": {
    backgroundColor: "#edf0fa",
  },
});

const UserLayout = () => {
  return (
    <div>
      <List
        sx={{
          overflow: "hidden",
        }}
      >
        <CustomListItem button to="dashboard" component={Link}>
          <ListItemIcon>
            <EqualizerIcon color="action" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </CustomListItem>
        <CustomListItem button to="create" component={Link}>
          <ListItemIcon>
            <BookIcon color="action" />
          </ListItemIcon>
          <ListItemText primary="New reservation" />
        </CustomListItem>
        <CustomListItem button to="list" component={Link}>
          <ListItemIcon>
            <ListIcon color="action" />
          </ListItemIcon>
          <ListItemText primary="Reservations" />
        </CustomListItem>

        <CustomListItem button to="check-out" component={Link}>
          <ListItemIcon>
            <AssignmentTurnedInIcon color="action" />
          </ListItemIcon>
          <ListItemText primary="Checkouts" />
        </CustomListItem>
      </List>
    </div>
  );
};

export default UserLayout;
