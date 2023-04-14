import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

import Dashboard from "../Dashboard";
const DashboardEmployee = () => {
  const navigate = useNavigate();

  const [sales, setSales] = useState([]);
  const [reservations, setReservations] = useState([]);
  const totalRef = useRef(0);
  const name = localStorage.getItem("name");
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:5000/api/reservation/dashboard/data")
      .then((res) => {
        totalRef.current = res.data.totalEarnings;
        setSales(res.data.sales);
        setReservations(res.data.reservations);
      })

      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
          localStorage.removeItem("token");
        }
      });
  }, []);
  return (
    <>
      <Dashboard
        name={name}
        statistics={`Overall statistics`}
        sort="Monthly"
        total={totalRef.current}
        sales={sales}
        reservations={reservations}
      />
    </>
  );
};

export default DashboardEmployee;
