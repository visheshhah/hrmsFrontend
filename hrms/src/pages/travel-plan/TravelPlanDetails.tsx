import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPlans, getTravelParticipants, getTravelPlanByid, type TravelPlanResponse } from "../../api/travel.api";
import { toast } from "react-toastify";
import type { EmployeeResponse } from "../../api/employee.api";
import { Box, Button, Card, CardContent, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function TravelPlanDetails(){
     const navigate = useNavigate();
        const [travelPlan, setTravelPlan] = useState<TravelPlanResponse | null>(null);
        const[employees, setEmployees] = useState<EmployeeResponse[]>([]);
        const { travelPlanId } = useParams();
        const travelPlanIdNum = Number(travelPlanId);
    
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

                        <Divider sx={{ my: 2 }} />
                        <Button variant="contained" onClick={() => navigate(`/dashboard/travel/${travelPlanId}/assign-common-document`)}>
                            Upload common document
                        </Button>
                 </CardContent>
            </Card>


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
                                <Button onClick={() => navigate(`/dashboard/travel/${travelPlanIdNum}/${employee.id}/assign-document`)} variant="contained">
                                    Assign Documents
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