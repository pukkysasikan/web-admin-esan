import { AccountCircle, InboxOutlined, Menu } from "@mui/icons-material";
import {
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Drawer,
  AppBar,
  IconButton,
  Typography,
  colors,
  MenuItem,
  Popper,
  IconButtonProps,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Home.module.css";

interface Props {
  window?: () => Window;
}
const drawerWidth = 240;
const handleClose = () => {
  setOpen(false);
};

export default function DrawerAppBarLayout(props: Props) {
  const { window } = props;

  const router = useRouter();

  const drawerItemStyle = { borderRadius: 0 };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [auth, setAuth] = React.useState(true);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const onLogout = () => {
    localStorage.removeItem("Logged");
    router.push("/");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const drawer = (
    <div>
      <Toolbar />

      <div>
        <ListItem disablePadding>
          <ListItemButton href="/menu_add">
            <ListItemIcon>
              <InboxOutlined />
            </ListItemIcon>
            <ListItemText primary="รายการอาหาร" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton href="promotion">
            <ListItemIcon>
              <InboxOutlined />
            </ListItemIcon>
            <ListItemText primary="โปรโมชั่น" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton href="order_list">
            <ListItemIcon>
              <InboxOutlined />
            </ListItemIcon>
            <ListItemText primary="รายการย้อนหลัง" />
          </ListItemButton>
        </ListItem>
      </div>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: 200,
          backgroundColor: "#FF5252",
          boxShadow: "none",
          zIndex: 0,
        }}
      >
        <Toolbar sx={{ zIndex: 2 }}>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          height: 900,
          mt: 5,
          borderRadius: 10,
        }}
        aria-label="mailbox folders"
      >
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
              height: 600,
              mt: 5,
              borderRadius: 10,
              backgroundColor: "#FF5252"
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: 600,
              mt: 5,
              borderRadius: 5,
              ml: 2,
              border: "none",
            },
          }}
          open
        >
          {drawer}
          <Button
            variant="contained"
            onClickCapture={onLogout}
            color="error"
            sx={{ borderRadius: 3,mt:40,
              mr:2,ml:2
            }}
          >Logout
          </Button>
        </Drawer>
      </Box>
    </>
  );
}
function setAnchorEl(currentTarget: EventTarget & HTMLElement) {
  throw new Error("Function not implemented.");
}

function setOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
