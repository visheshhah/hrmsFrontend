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
import type { EmployeeExpenseResponse } from "../../../api/expense.api";

interface Props {
  expenses: EmployeeExpenseResponse[];
  travelPlanId: number;
  employeeId: number;
}

export default function ExpenseTable({ 
  expenses,
  travelPlanId,
  employeeId, 

}: Props) {
  const navigate = useNavigate();

  const getAction = (expense: EmployeeExpenseResponse) => {
    if (expense.expenseStatus === "SUBMITTED") {
      return {
        label: "Verify Expense",
        path: `/dashboard/expense/travel/${travelPlanId}/${employeeId}/${expense.id}/expenses/verify`,
      };
    }

    return {
      label: "Update Decision",
      path: `/dashboard/expense/travel/${travelPlanId}/${employeeId}/${expense.id}/expenses/update`,
    };
  };

  return (
    <TableContainer component={Paper}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {expenses?.map((expense) => (
                            <TableRow key={expense.id}>
                                <TableCell>{expense.description}</TableCell>
                                <TableCell>{expense.categoryName}</TableCell>
                                <TableCell>{expense.expenseStatus}</TableCell>
                                <TableCell>{expense.amount}</TableCell>

                                <TableCell align="center">
                                  <Button
                                    onClick={() => navigate(getAction(expense).path)}
                                    variant="contained"
                                  >
                                    {getAction(expense).label}
                                  </Button>
                                </TableCell>
                            </TableRow>
                            ))}

                            {expenses?.length === 0 && (
                            <TableRow key="no-expenses">
                                <TableCell colSpan={6} align="center">
                                No Expenses found
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TableContainer>
  );
}