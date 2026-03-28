import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function RoleLayout(){
     return (
    <Box>
      <Typography variant="h5" mb={3}>
        Manage Roles
      </Typography>
      <Outlet />
    </Box>
  );
}