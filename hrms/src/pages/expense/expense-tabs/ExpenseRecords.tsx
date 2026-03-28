import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import { getApprovedAmountByTravelPlanAndEmployeeByHr, getClaimedAmountByTravelPlanAndEmployeeByHr, getExployeeExpensesByEmployeeIdAndStatus, type EmployeeExpenseResponse } from "../../../api/expense.api";
import ExpenseTable from "./ExpenseTable";
import { useParams } from "react-router-dom";

export default function ExpenseRecords() {
  const [tab, setTab] = useState(0);
  const [expenses, setExpenses] = useState<EmployeeExpenseResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { travelPlanId, employeeId } = useParams();

   const [claimedExpense, setClaimedExpense] = useState(0);
    const [approvedExpense, setApprovedExpense] = useState(0);


  const statusMap = ["SUBMITTED", "APPROVED", "REJECTED"];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
                  getClaimedAmountByTravelPlanAndEmployeeByHr(Number(travelPlanId), Number(employeeId))
                      .then((data) => setClaimedExpense(data))
              }, []);
      
      useEffect(() => {
                  getApprovedAmountByTravelPlanAndEmployeeByHr(Number(travelPlanId), Number(employeeId))
                      .then((data) => setApprovedExpense(data))
      }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);

        const data = await getExployeeExpensesByEmployeeIdAndStatus(Number(travelPlanId), Number(employeeId), statusMap[tab]);

        setExpenses(data);
      } catch {
        toast.error("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [tab]);

  return (
    <Box>
      <Stack
                    direction="row"
                    gap={2}
                >

                    <Card sx={{ mb: 3, flex: 1 }}>
                            <CardContent>
                                <Typography variant="h6">Total Claimed Expense</Typography>
                

                                <Divider sx={{ my: 2 }} />
                                <Typography>Rs.{claimedExpense}</Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ mb: 3, flex: 1 }}>
                            <CardContent>
                                <Typography variant="h6">Total Approved Expense</Typography>
                

                                <Divider sx={{ my: 2 }} />
                                <Typography>Rs.{approvedExpense}</Typography>
                        </CardContent>
                    </Card>
                </Stack>

      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Submitted" />
          <Tab label="Approved" />
          <Tab label="Rejected" />
        </Tabs>
      </Paper>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : expenses.length === 0 ? (
        <Typography textAlign="center">
          No expenses found
        </Typography>
      ) : (
        <ExpenseTable travelPlanId={Number(travelPlanId)} employeeId={Number(employeeId)} expenses={expenses} />
      )}
    </Box>
  );
}