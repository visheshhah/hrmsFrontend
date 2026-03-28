import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function ManagerLayout(){
     return (
    <Box>
      <Typography variant="h5" mb={3}>
        
      </Typography>
      <Outlet />
    </Box>
  );
}