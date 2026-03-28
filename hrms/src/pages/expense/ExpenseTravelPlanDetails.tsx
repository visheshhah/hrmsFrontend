import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPlans, getTravelParticipants, getTravelPlanByid, type TravelPlanResponse } from "../../api/travel.api";
import { toast } from "react-toastify";
import type { EmployeeResponse } from "../../api/employee.api";
import { Box, Button, Card, CardContent, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { getTotalApprovedAmountByTravelPlanByHr, getTotalClaimedAmountByTravelPlanByHr } from "../../api/expense.api";

export default function ExpenseTravelPlanDetails(){
     const navigate = useNavigate();
        const [travelPlan, setTravelPlan] = useState<TravelPlanResponse | null>(null);
        const[employees, setEmployees] = useState<EmployeeResponse[]>([]);
        const { travelPlanId } = useParams();
        const travelPlanIdNum = Number(travelPlanId);

        const [claimedExpense, setClaimedExpense] = useState(0);
        const [approvedExpense, setApprovedExpense] = useState(0);
    
        useEffect(() => {
             getTravelPlanByid(travelPlanIdNum)
                        .then((data) => {
                            setTravelPlan(data);
                        })
                        .catch(() => toast.error("Failed to load jobs"))
        },[]);

        useEffect(() => {
             getTravelParticipants(travelPlanIdNum)
                        .then((data) => {
                            setEmployees(data);
                        })
                        .catch(() => toast.error("Failed to load jobs"))
        },[]);

        useEffect(() => {
            getTotalClaimedAmountByTravelPlanByHr(travelPlanIdNum)
                .then((data) => setClaimedExpense(data))
        })

         useEffect(() => {
            getTotalApprovedAmountByTravelPlanByHr(travelPlanIdNum)
                .then((data) => setApprovedExpense(data))
        })

        return(
            <Box>
                <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h5">{travelPlan?.title}</Typography>
                            <Typography color="text.secondary" mb={2}>
                                {travelPlan?.startDate} - {travelPlan?.endDate}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="subtitle1">Description</Typography>
                            <Typography>{travelPlan?.description}</Typography>
                    </CardContent>
                </Card>

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


                <Card>
                    <Typography variant="h6" m={3}>
                                    Participants
                                </Typography>

                        <TableContainer component={Paper}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {employees?.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                                <TableCell>{employee.designation}</TableCell>
                                <TableCell>{employee.department}</TableCell>

                                <TableCell align="center">
                                <Button onClick={() => navigate(`/dashboard/expense/travel/${travelPlanIdNum}/${employee.id}/expenses`)} variant="contained">
                                    View Expenses
                                </Button>
                                </TableCell>
                            </TableRow>
                            ))}

                            {employees?.length === 0 && (
                            <TableRow key="no-employees">
                                <TableCell colSpan={6} align="center">
                                No Employees found
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