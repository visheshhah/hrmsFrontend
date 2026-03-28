import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { deleteTravelPlan, getAllTravelPlanByStatus, type TravelPlanResponse } from "../../../api/travel.api";
import HRTravelTable from "./HRTravelTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export default function HRTravelPlans() {
  const [travels, setTravels] = useState<TravelPlanResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tab = Number(searchParams.get("tab") || 0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSearchParams({ tab: String(newValue) });
  };

  const statusMap = ["ACTIVE", "DRAFT", "COMPLETED"];

    useEffect(() => {
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "0" });
    }
  }, []);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        setLoading(true);

        const data = await getAllTravelPlanByStatus(statusMap[tab]);

        setTravels(data);
      } catch {
        toast.error("Failed to load travel plans");
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, [tab]);

  const handleDelete = async (id: number) => {
  try {
    await deleteTravelPlan(id);

    setTravels((prev) =>
      prev.filter((plan) => plan.travelPlanId !== id)
    );

    toast.success("Deleted successfully");
  } catch {
    toast.error("Failed to delete");
  }
};

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Typography variant="h5" sx={{my:2}}>
        Manage Travel Plans
      </Typography>

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
        <HRTravelTable onDelete={handleDelete} travelPlans={travels} />
      )}
    </Box>
  );
}