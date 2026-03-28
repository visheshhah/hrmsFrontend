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
import { openFile } from "../../../api/file.api";

interface Props {
  expenses: EmployeeExpenseResponse[];
  travelPlanId: number;
  employeeId: number;
}

export default function EmployeeExpenseTable({ 
  expenses

}: Props) {
  const navigate = useNavigate();


  return (
    <TableContainer component={Paper}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Remark</TableCell>
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
                                <TableCell>
                                    {expense.remark ? expense.remark : "-"}
                                </TableCell>
                                <TableCell align="center">
                                <Button onClick={() => openFile(expense.proofs[0].id)} variant="contained">
                                    View Proof
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