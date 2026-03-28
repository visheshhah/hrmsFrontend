import { useEffect, useState } from "react";
import { getEmployeesByManager, type EmployeeResponse } from "../../api/employee.api";
import { toast } from "react-toastify";
import { Box, Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ManagerTeamList(){
    const[employees, setEmployees] = useState<EmployeeResponse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployeesByManager()
        .then((data) => setEmployees(data))
        .catch(() => toast.error("Failed to load team members"));
    }, []);

    return(
        <Box>
            <Card>
                    <Typography variant="h6" m={3}>
                        Team
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
                                <Button
                                    variant="contained"
                                    onClick={() => navigate(`/dashboard/team/${employee.id}`)}
                                >
                                    View details
                                </Button>
                                </TableCell>
                            </TableRow>
                            ))}

                            {employees?.length === 0 && (
                            <TableRow key="no-employees">
                                <TableCell colSpan={6} align="center">
                                No team members found
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