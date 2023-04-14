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
import { Paper, Grid, Typography, List } from "@mui/material";
import Header from "./Header";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PaidIcon from "@mui/icons-material/Paid";
const Dashboard = (props) => {
  return (
    <>
      <Header
        title="Dashboard"
        icon={
          <EqualizerIcon
            color="primary"
            sx={{
              width: "70%",
              height: "70%",
            }}
          />
        }
      />
      <Grid item xs={12}>
        <List>
          <Typography variant="h6">Welcome, {props.name}</Typography>
          <Typography variant="subtitle2">{props.statistics}</Typography>
        </List>
      </Grid>

      <Grid item xs={10}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            height: 300,
            p: 2,
          }}
        >
          <Typography variant="h6" color="primary">
            Sales
          </Typography>
          <ResponsiveContainer height="100%">
            <LineChart
              data={props.sales}
              margin={{
                top: 20,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />
              <YAxis>
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: "middle",
                  }}
                >
                  Sales ($)
                </Label>
              </YAxis>
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <PaidIcon
            color="primary"
            sx={{
              width: "50%",
              height: "50%",
            }}
          />
          <Typography
            variant="h6"
            color="primary"
            sx={{
              pb: 3,
            }}
          >
            Total earnings
          </Typography>
          <Typography
            variant="h4"
            color="primary"
            sx={{
              color: "secondary",
            }}
          >
            {props.total} $
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            height: 340,
            p: 2,
          }}
        >
          <Typography variant="h6" color="primary">
            Reservations
          </Typography>
          <ResponsiveContainer height="100%">
            <BarChart
              data={props.reservations}
              margin={{
                top: 20,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis>
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: "middle",
                  }}
                >
                  Reservations
                </Label>
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </>
  );
};

export default Dashboard;
