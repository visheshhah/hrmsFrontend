import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import ManagerTravelTable from "./ManagerTravelTable";
import { getTravelPlanByEmployeeIdAndStatus, type TravelPlanResponse } from "../../api/travel.api";

type ManagerTravelPlanTabProps = {
    employeeId: number;
}

export default function ManagerTravelPlanTabs({employeeId}: ManagerTravelPlanTabProps) {
  const [tab, setTab] = useState(0);
  const [travels, setTravels] = useState<TravelPlanResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const statusMap = ["ACTIVE", "DRAFT", "COMPLETED"];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        setLoading(true);

        const data = await getTravelPlanByEmployeeIdAndStatus(employeeId, statusMap[tab]);

        setTravels(data);
      } catch {
        toast.error("Failed to load travel plans");
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, [tab]);

  return (
    <Box>
      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Active" />
          <Tab label="Upcoming" />
          <Tab label="Completed" />
        </Tabs>
      </Paper>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : travels.length === 0 ? (
        <Typography textAlign="center">
          No travel plans found
        </Typography>
      ) : (
        <ManagerTravelTable employeeId={employeeId} travels={travels} />
      )}
    </Box>
  );
}