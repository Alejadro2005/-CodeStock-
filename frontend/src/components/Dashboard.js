import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  History as HistoryIcon,
  Inventory as InventoryIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Dashboard = ({ userRole }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Productos', icon: <InventoryIcon />, path: '/productos' },
    { text: 'Ventas', icon: <ShoppingCartIcon />, path: '/ventas' },
    { text: 'Historial', icon: <HistoryIcon />, path: '/historial' },
  ];

  if (userRole === 'admin') {
    menuItems.push({ text: 'Usuarios', icon: <PeopleIcon />, path: '/usuarios' });
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
          ml: open ? `${drawerWidth}px` : 0,
          transition: 'width 0.3s ease, margin-left 0.3s ease',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CodeStock
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
          ml: open ? `${drawerWidth}px` : 0,
          transition: 'width 0.3s ease, margin-left 0.3s ease',
        }}
      >
        <Toolbar />
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido a CodeStock
        </Typography>
        <Typography variant="body1">
          Sistema de Gestión de Inventario
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard; 