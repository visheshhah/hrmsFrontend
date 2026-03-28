import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
  Typography
} from "@mui/material";
import { toast } from "react-toastify";
import {getExployeeExpensesByEmployeeIdAndStatusByEmployee, type EmployeeExpenseResponse } from "../../../api/expense.api";
import { useParams } from "react-router-dom";
import { useUser } from "../../../context/UseUser";
import EmployeeExpenseTable from "./EmployeeExpenseTable";

export default function EmployeeExpenseRecords() {
  const [tab, setTab] = useState(0);
  const [expenses, setExpenses] = useState<EmployeeExpenseResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const { travelPlanId } = useParams();
  const {user} = useUser();

  //  const [claimedExpense, setClaimedExpense] = useState(0);
  //   const [approvedExpense, setApprovedExpense] = useState(0);


  const statusMap = ["SUBMITTED", "APPROVED", "REJECTED"];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // useEffect(() => {
  //                 getTotalClaimedAmountByEmployee(Number(travelPlanId))
  //                     .then((data) => setClaimedExpense(data))
  //             }, []);
      
  //     useEffect(() => {
  //                 getTotalApprovedAmountByEmployee(Number(travelPlanId))
  //                     .then((data) => setApprovedExpense(data))
  //     }, []);

  useEffect(() => {

    if (!user?.employeeId) return;

    const fetchExpenses = async () => {
      try {
        setLoading(true);

        const data = await getExployeeExpensesByEmployeeIdAndStatusByEmployee(Number(travelPlanId), user?.employeeId, statusMap[tab]);

        setExpenses(data);
      } catch {
        toast.error("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [tab, user?.employeeId]);

  return (
    <Box>
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
        <EmployeeExpenseTable expenses={expenses} />
      )}
    </Box>
  );
}