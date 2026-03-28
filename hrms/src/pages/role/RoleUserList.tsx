import { useEffect, useState } from "react"
import { getUsers, type EmployeeRoleResponse } from "../../api/role.api"
import { toast } from "react-toastify"
import { Box, Button, Card, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import RoleUpdateModal from "./RoleUpdateModal";

export default function RoleUserList(){

    const[users, setUsers] = useState<EmployeeRoleResponse[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<EmployeeRoleResponse | null>(null);

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
            .catch(() => toast.error("Error loading user data"));
    }, []);

    return(
        <Box>
            <Card>
                    <Typography variant="h6" m={3}>
                        Users
                    </Typography>

                        <TableContainer component={Paper}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{user.designation}</TableCell>
                                <TableCell>{user.department}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {user.roles?.map((role) => (
                                            <Chip key={role} label={role} size="small" />
                                        ))}
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">
                                <Button
                                    variant="contained"
                                    disabled={!user}
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setOpen(true);
                                    }}
                                >
                                    Update Roles
                                </Button>
                                </TableCell>
                            </TableRow>
                            ))}

                            {users?.length === 0 && (
                            <TableRow key="no-employees">
                                <TableCell colSpan={6} align="center">
                                No Users found
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
                <RoleUpdateModal
                                open={open}
                                onClose={() => {
                                    setOpen(false);
                                    setSelectedUser(null);
                                }}
                                userId={selectedUser?.id || 0}
                                onSuccess={() => {
                                    getUsers().then(setUsers);
                                }}
                />
        </Box>
    )
}