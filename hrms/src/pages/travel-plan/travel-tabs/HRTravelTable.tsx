import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { TravelPlanResponse } from "../../../api/travel.api";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";

interface Props {
  travelPlans: TravelPlanResponse[];
  onDelete: (travelPlanId: number) => void;
}

export default function HRTravelTable({ travelPlans, onDelete }: Props) {
  const navigate = useNavigate();

  const handleDelete = async (travelPlanId: number) => {
          const confirmDelete = window.confirm("Are you sure you want to delete this plan?");
          if (!confirmDelete) return;
        
           onDelete(travelPlanId);
        };

    return (
         <Box>

            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Period</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {travelPlans?.map((travel) => (
                    <TableRow key={travel.travelPlanId}>
                        <TableCell>{travel.title}</TableCell>
                        <TableCell>{travel.startDate} - {travel.endDate}</TableCell>
                        <TableCell>{travel.status}</TableCell>
                        <TableCell>{travel.sourceLocation}</TableCell>
                        <TableCell>{travel.destinationLocation}</TableCell>

                        <TableCell align="center">
                           <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                                >
                                <Tooltip title="View Details">
                                    <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={() => navigate(`/dashboard/travel/${travel.travelPlanId}`)}
                                    >
                                    <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Update">
                                    <IconButton
                                    color="secondary"
                                    size="small"
                                    onClick={() => navigate(`/dashboard/travel/update/${travel.travelPlanId}`)}
                                    >
                                    <EditIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete">
                                    <IconButton
                                    color="error"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(travel.travelPlanId);
                                    }}
                                    >
                                    <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                </Stack>
                        </TableCell>
                    </TableRow>
                    ))}

                    {travelPlans?.length === 0 && (
                    <TableRow key="no-jobs">
                        <TableCell colSpan={6} align="center">
                        No travel plans found
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </TableContainer>
      </Box>
    )
}