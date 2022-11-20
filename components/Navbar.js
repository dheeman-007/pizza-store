import * as React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Typography,
  Toolbar,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Drawer,
  Divider,
  Box,
  AppBar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const drawerWidth = 240;

export const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        component="div"
        sx={{
          flexGrow: 1,
          display: { xs: "block" },
          fontFamily: "Great Vibes",
          fontSize: { xs: "25px", sm: "35px" },
          mt: 0.5,
        }}
      >
        Pizzeria
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href={`/`}>
              <ListItemText primary="Homepage" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href={`/contact`}>
              <ListItemText primary="Contact" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href={`/menu`}>
              <ListItemText primary="Menu" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href={`/admin`}>
              <ListItemText primary="Admin Dashboard" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "block" },
              fontFamily: "Great Vibes",
              fontSize: { xs: "25px", sm: "35px" },
              mt: 0.5,
            }}
          >
            <Link href="/">Pizzeria</Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" }, pr: 10 }}>
            <Button sx={{ color: "#fff" }}>
              <Link href="/admin">
                <Typography style={{ fontSize: "12px" }}>
                  Admin Dashboard
                </Typography>
              </Link>
            </Button>
            <Button sx={{ color: "#fff" }}>
              <Link href="/">
                <Typography style={{ fontSize: "12px" }}>Home</Typography>
              </Link>
            </Button>
            <Button sx={{ color: "#fff" }}>
              <Link href="/menu">
                <Typography style={{ fontSize: "12px" }}>Menu</Typography>
              </Link>
            </Button>
            <Button sx={{ color: "#fff" }}>
              <Link href="/contact">
                <Typography style={{ fontSize: "12px" }}>Contact</Typography>
              </Link>
            </Button>
          </Box>
          <IconButton color="inherit">
            <Link href="/cart">
              <ShoppingCartIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};
