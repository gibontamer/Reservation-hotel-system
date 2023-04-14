import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from './Components/Login';
import AddEmployee from './Components/Admin/AddEmployee';
import { Routes, Route } from "react-router-dom";
import DashboardEmployee from "./Components/Employee/DashboardEmployee";
import DashboardAdmin from './Components/Admin/DashboardAdmin';
import Page from "./Components/Page";
import Reservations from "./Components/Employee/Reservations";
import NewReservation from "./Components/Employee/NewReservation";
import Layout from "./Components/Layout";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AddRoom from "./Components/Admin/AddRoom";
import Reservation from "./Components/Employee/Reservation";
import EmployeeList from "./Components/Admin/Employees";
import PasswordCreation from './Components/PasswordCreation';
import Checkouts from "./Components/Employee/Checkouts";
import ErrorPage from './Components/ErrorPage';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProtectedRoute from './Components/ProtectedRoute';
import RoomList from './Components/Admin/RoomList';



const themeLight = createTheme({
  palette: {
    background: {
      default: "#f0f3fb",
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={themeLight}>
      <SnackbarProvider maxSnack={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes>
            <Route path="/" exact element={<ProtectedRoute />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/create-password" element={<Page />}>
              <Route exact path=":token" element={<PasswordCreation />} />
            </Route>
            <Route path="/" element={<ProtectedRoute />} >
              <Route path="/reservation" element={<Layout />}>
                <Route path="dashboard" element={<DashboardEmployee />} />
                <Route path="list" element={<Reservations />} />
                <Route path="create" element={<NewReservation />} />
                <Route path="id/:id" element={<Reservation />} />
                <Route path="check-out" element={<Checkouts />} />
              </Route>
            </Route>
            <Route path="/" element={<ProtectedRoute />} >
              <Route path="/admin" element={<Layout />} >
                <Route exact path="employee" element={<Page />}>
                  <Route path="list" element={<EmployeeList />} />
                  <Route path="create" element={<AddEmployee />} />
                </Route>
                <Route path="room" >
                  <Route path="list" element={<RoomList />} />
                  <Route path="add" element={<AddRoom />} />
                </Route>
                <Route path="dashboard" element={<DashboardAdmin />} />
              </Route>
            </Route>

          </Routes>
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>

  );
}

export default App;
