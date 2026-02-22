import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/useAuth";

type NavbarProps = {
    drawerWidth: number;
}

export default function Navbar({ drawerWidth }: NavbarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: 1201, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HRMS Dashboard
        </Typography>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}