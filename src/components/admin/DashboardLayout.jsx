// Dashboard.tsx
import React from "react";
import { Box, Grid, Card, CardContent, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar } from "@mui/material";
import { Home, Apps, BarChart, TableChart, Map, Widgets, Layers } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, BarChart as RBarChart, Bar, Legend } from "recharts";

const userActivityData = [
  { date: "4 Jan", users: 50, sessions: 30 },
  { date: "5 Jan", users: 100, sessions: 60 },
  { date: "6 Jan", users: 120, sessions: 70 },
  { date: "7 Jan", users: 150, sessions: 100 },
  { date: "8 Jan", users: 180, sessions: 120 },
  { date: "9 Jan", users: 200, sessions: 140 },
  { date: "10 Jan", users: 160, sessions: 110 },
];

const activeNowData = [
  { day: "Sat", active: 70 },
  { day: "Sun", active: 60 },
  { day: "Mon", active: 80 },
  { day: "Tue", active: 85 },
  { day: "Wed", active: 75 },
  { day: "Thu", active: 65 },
  { day: "Fri", active: 50 },
];

const acquisitionData = [
  { day: "Mon", organic: 30, paid: 20, referral: 10 },
  { day: "Tue", organic: 40, paid: 30, referral: 20 },
  { day: "Wed", organic: 50, paid: 40, referral: 30 },
  { day: "Thu", organic: 60, paid: 50, referral: 40 },
  { day: "Fri", organic: 80, paid: 70, referral: 50 },
  { day: "Sat", organic: 90, paid: 80, referral: 60 },
  { day: "Sun", organic: 110, paid: 90, referral: 70 },
];

const metrics = [
  { label: "Users", value: "5658", change: "+7%", color: "green" },
  { label: "Sessions", value: "324", change: "+17%", color: "green" },
  { label: "Bounce Rate", value: "24.9%", change: "-4%", color: "red" },
  { label: "Session Duration", value: "5m 32s", change: "+9%", color: "green" },
];

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer 
        variant="permanent" 
        sx={{ 
          width: 'auto', 
          flexShrink: 0, 
          [`& .MuiDrawer-paper`]: { 
            width: 220, 
            boxSizing: "border-box",
            top: 64, // Account for AppBar height
            height: 'calc(100% - 64px)', // Adjust height accordingly
            margin: 1, // Add margin around the sidebar
            borderRadius: 1, // Optional: add rounded corners
          } 
        }}
      >
        <List>
          {[{ text: "Home", icon: <Home /> }, { text: "Apps", icon: <Apps /> }, { text: "Charts", icon: <BarChart /> }, { text: "UI", icon: <Layers /> },
            { text: "Advanced", icon: <Layers /> }, { text: "Map", icon: <Map /> }, { text: "Forms", icon: <TableChart /> }, { text: "Table", icon: <TableChart /> },
            { text: "Widget", icon: <Widgets /> }, { text: "Pages", icon: <Layers /> }].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 2 }}>
        
        {/* Metric Cards */}
        <Grid container spacing={2}>
          {metrics.map((m, i) => (
            <Grid item xs={12} md={3} key={i}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{m.label}</Typography>
                  <Typography variant="h4">{m.value}</Typography>
                  <Typography sx={{ color: m.color }}>{m.change}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* User Activity */}
        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>User Activity</Typography>
              <AreaChart width={600} height={250} data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="sessions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </CardContent>
          </Card>
        </Box>

        {/* Active Now + User Acquisition */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Now</Typography>
                <RBarChart width={400} height={250} data={activeNowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="active" fill="#8884d8" />
                </RBarChart>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">User Acquisition</Typography>
                <RBarChart width={400} height={250} data={acquisitionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="organic" stackId="a" fill="#8884d8" />
                  <Bar dataKey="paid" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="referral" stackId="a" fill="#ffc658" />
                </RBarChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
