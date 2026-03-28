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
import { getAllTravelPlanByStatus, type TravelPlanResponse } from "../../../api/travel.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HRExpenseTravelTable from "./HRExpenseTravelTable";


interface Props {
  onClick: (travel: TravelPlanResponse) => void;
  actionLabel?: string;
  pageTitle: string;
}

export default function HRExpenseTravelPlans({ onClick, actionLabel, pageTitle }: Props) {
  //const [tab, setTab] = useState(0);
  const [travels, setTravels] = useState<TravelPlanResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tab = Number(searchParams.get("tab") || 0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSearchParams({ tab: String(newValue) });
  };


  const statusMap = ["ACTIVE", "DRAFT", "COMPLETED"];

  // const handleChange = (_: React.SyntheticEvent, newValue: number) => {
  //   setTab(newValue);
  // };

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
        {pageTitle}
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
        <HRExpenseTravelTable onClick={onClick} actionLabel={actionLabel} travels={travels} />
      )}
    </Box>
  );
}