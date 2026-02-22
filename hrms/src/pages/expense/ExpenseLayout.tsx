import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function ExpenseLayout(){
     return (
    <Box>
      <Typography variant="h5" mb={3}>
        Expenses
      </Typography>
      <Outlet />
    </Box>
  );
}