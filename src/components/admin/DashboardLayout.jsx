// Dashboard.tsx
import React from "react";
import { Box, Grid, Card, CardContent, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar } from "@mui/material";
import { Home, Apps, BarChart, Layers } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from "../home/ResponsiveAppBar";


export default function Dashboard({ children }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

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
            top: 50, // Account for AppBar height
            height: 'calc(100% - 64px)', // Adjust height accordingly
            margin: 1, // Add margin around the sidebar
            borderRadius: 1, // Optional: add rounded corners
          } 
        }}
      >
        <List>
          {[{ text: "Home", path: "/", icon: <Home /> }, { text: "Apps", path: "/apps", icon: <Apps /> }, { text: "Materials", path: "/materials", icon: <BarChart /> }, { text: "Courses", path: "/courses", icon: <Layers /> },
            { text: "Analysis", path: "/analysis", icon: <Layers /> }].map((item, index) => (
            <ListItem button key={index} onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
