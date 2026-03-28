import { useEffect, useState } from "react";
import { deleteEmployeeById, getEmployeeProfileList, type EmployeeDetailResponse } from "../../api/employee.api";
import { toast } from "react-toastify";
import { Box, Button, Card, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function EmployeeProfileList(){
    const [employees, setEmployees] = useState<EmployeeDetailResponse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployeeProfileList()
            .then((data) => setEmployees(data))
            .catch(() => toast.error("Unable to load employees"))
    }, []);

     const handleDelete = async (employeeId: number) => {
              const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
              if (!confirmDelete) return;
            
              try {
                await deleteEmployeeById(employeeId);
            
                setEmployees((prev) => prev.filter((employee) => employee.id !== employeeId));
            
                toast.success("Employee deleted");
              } catch {
                toast.error("Failed to delete employee");
              }
    };

     return(
            <Box>
                <Card>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                    <Typography variant="h6" m={3}>
                        Employees
                    </Typography>

                    <Button variant="contained" onClick={() => navigate("/dashboard/employee/add")} sx={{mr:3}}>
                        Add Employee
                    </Button>

                    </Stack>

                        <TableContainer component={Paper}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {employees?.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.fullName}</TableCell>
                                <TableCell>{employee.designation}</TableCell>
                                <TableCell>{employee.departmentName}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.phoneNumber}</TableCell>

                                <TableCell align="center">
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="center"
                                    alignItems="center"
                                    >
                                        <Tooltip title="Update">
                                            <IconButton
                                            color="secondary"
                                            size="small"
                                            onClick={() => navigate(`/dashboard/employee/${employee.id}`)}
                                            >
                                            <EditIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Delete">
                                            <IconButton
                                            color="error"
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(employee.id);
                                            }}
                                            >
                                            <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                {/* <Button onClick={() => navigate(`/dashboard/employee/${employee.id}`)} variant="contained">
                                    Update
                                </Button> */}
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