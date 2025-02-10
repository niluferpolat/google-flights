import React from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/Navbar.css";
import {
  AirlineSeatFlat,
  Flight,
  House,
  HouseOutlined,
  Luggage,
  TravelExplore,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import AppsIcon from '@mui/icons-material/Apps';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages = [
    {
      id: 1,
      label: "Travel",
      icon: <Luggage />,
    },
    {
      id: 2,
      label: "Explore",
      icon: <TravelExplore />,
    },
    {
      id: 3,
      label: "Flights",
      icon: <Flight />,
    },
    {
      id: 4,
      label: "Hotels",
      icon: <AirlineSeatFlat />,
    },
    {
      id: 5,
      label: "Holiday Rentals",
      icon: <HouseOutlined />,
    },
  ];
  return (
    <div>
      <AppBar position="static" className="navbar-container">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton>
              <MenuIcon
                sx={{ display: { xs: "none", md: "flex" }, color: "#666" }}
              />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="https://www.google.com/?authuser=0"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Box
                component={"img"}
                sx={{ height: 70, width: 100, ml: 0 }}
                src={`${process.env.PUBLIC_URL}/images/icons/google-logo.png`}
              />
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "start",
                gap: "8px",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant="outlined"
                  sx={{
                    borderRadius: "50px",
                    borderColor: "#ddd",
                    padding: "6px 16px",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  startIcon={page.icon}
                >
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      color: "#000",
                      fontSize: "0.9rem",
                    }}
                  >
                    {page.label}
                  </Typography>
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "end",
                gap: "8px",
              }}
            >
              <div>
                <IconButton onClick={handleMenu}>
                  <DarkModeIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Dark Theme</MenuItem>
                  <MenuItem onClick={handleClose}>Light Theme</MenuItem>
                </Menu>
              </div>
              <div>
              <IconButton>
                  <AppsIcon />
                </IconButton>
              </div>
              <div>
                <IconButton>
                    <AccountCircleIcon/>
                </IconButton>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
