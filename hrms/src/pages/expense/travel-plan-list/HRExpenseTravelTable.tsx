import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { TravelPlanResponse } from "../../../api/travel.api";

interface Props {
  travels: TravelPlanResponse[];
  onClick: (travel: TravelPlanResponse) => void;
  actionLabel?: string;
}

export default function HRExpenseTravelTable({ travels, onClick, actionLabel }: Props) {
  //const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Period</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {travels.map((travel) => (
            <TableRow key={travel.travelPlanId}>
              <TableCell>{travel.title}</TableCell>
              <TableCell>{travel.startDate} - {travel.endDate}</TableCell>
              <TableCell>{travel.sourceLocation}</TableCell>
              <TableCell>{travel.destinationLocation}</TableCell>

              <TableCell align="right">
                <Button
                  variant="contained"
                  onClick={() =>
                    onClick(travel)
                  }
                >
                  {actionLabel}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}