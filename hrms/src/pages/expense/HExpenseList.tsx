import { useEffect, useState } from "react"
import { getExployeeExpenses, getExployeeExpensesByEmployeeId, submitExpense, type EmployeeExpenseResponse, type SubmitExpense } from "../../api/expense.api"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Card, CardContent, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";


export default function HExpenseList(){

    const[expenses, setExpenses] = useState<EmployeeExpenseResponse[]>([]);
    const { travelPlanId, employeeId } = useParams();
    const navigate  = useNavigate();

    useEffect(() => {
         getExployeeExpensesByEmployeeId(Number(travelPlanId), Number(employeeId))
            .then((data) => setExpenses(data))
            .catch(() => toast.error("Failed to load expense"))
    }, []);

    return(
        <Box>
                <Card sx={{ mt: 4}}>
                    <Typography variant="h6" m={3}>
                        Expenses
                    </Typography>

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
                                <Button onClick={() => navigate(`/dashboard/expense/travel/${Number(travelPlanId)}/${Number(employeeId)}/${expense.id}/expenses/verify`)} variant="contained">
                                    Verify Expense
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
                </Card>
            </Box>
    )
}