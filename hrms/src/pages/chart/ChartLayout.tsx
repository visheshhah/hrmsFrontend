import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function ChartLayout(){
     return (
    <Box>
      <Typography variant="h5" mb={3}>
        Employees
      </Typography>
      <Outlet />
    </Box>
  );
}