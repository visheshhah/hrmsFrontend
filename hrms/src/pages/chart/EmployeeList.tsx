import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployees, type EmployeeResponse } from "../../api/employee.api";
import { Box, Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function EmployeeList(){
     const navigate = useNavigate(); 
        const[employees, setEmployees] = useState<EmployeeResponse[]>([]);

        useEffect(() => {
             getEmployees()
                        .then((data) => {
                            setEmployees(data);
                        })
                        .catch(() => toast.error("Failed to load employees"))
        },[]);

        return(
            <Box>
                <Card>
                    <Typography variant="h6" m={3}>
                        Employees
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
                                <Button onClick={() => navigate(`/dashboard/chart/${employee.id}`)} variant="contained">
                                    View Chain
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