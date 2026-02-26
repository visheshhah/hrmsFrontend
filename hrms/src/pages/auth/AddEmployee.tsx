import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { AddEmployeeRequest } from "../../api/employee.api";
import { useEffect, useState } from "react";
import { addEmployee, getEmployees, type EmployeeResponse } from "../../api/employee.api";
import { getDepartments, type DepartmentResponse } from "../../api/department.api";
import { toast } from "react-toastify";
import { Button, Card, CardContent, Container, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import axios from "axios";

interface FormValues {
    firstName: string;
    lastName: string;
    designation: string;
    phoneNumber: string;
    email: string;
    salary: number;
  dateOfBirth: Dayjs | null;
  joiningDate: Dayjs | null;
  departmentId: number;
  managerId?: number;
}

export default function AddEmployee(){

    const navigate = useNavigate();
    const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
    const [managers, setManagers] = useState<EmployeeResponse[]>([]);

    useEffect(() => {
         getDepartments()
        .then((data) => setDepartments(data))
        .catch(() => toast.error("Unable to load departments"))
    }, []);

    useEffect(() => {
        getEmployees()
        .then((data) => setManagers(data))
        .catch(() => toast.error("Unable to load employees"))
    }, []);

    const {
        reset,
            control,
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<FormValues>(
            { defaultValues: { 
            departmentId: 0,
            managerId: 0
        } }
        );

    const onSubmit = async (data: FormValues) => {
        try {
            const payload: AddEmployeeRequest = {
            dateOfBirth: data.dateOfBirth?.format("YYYY-MM-DD"),
            designation: data.designation,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            joiningDate: data.joiningDate?.format("YYYY-MM-DD"),
            phoneNumber: data.phoneNumber,
            salary: data.salary,
            departmentId: data.departmentId,
            managerId: data.managerId ? data.managerId : null
            };
        
            await addEmployee(payload);
        
            toast.success("Employee added successfully");
            reset();
            navigate("/employee"); 
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "API Error");
            } else {
            toast.error("Something went wrong");
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <Button variant="outlined" onClick={() =>navigate(-1)}>
                Back
            </Button>
            <Typography variant="h5" mb={3}>
                Add Employee
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>


                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>

                            <Controller
                                name="firstName"
                                control={control}
                                rules={{ required: "First name is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="First name"
                                    fullWidth
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                                )}
                            />
                    
                    
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{ required: "Last name is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="last name"
                                    fullWidth
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                                )}
                            />
                    
                    
                            <Controller
                                name="designation"
                                control={control}
                                rules={{ required: "Designation is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Designation"
                                    fullWidth
                                    error={!!errors.designation}
                                    helperText={errors.designation?.message}
                                />
                                )}
                            />
                    
                            <Controller
                                name="phoneNumber"
                                control={control}
                                rules={{ required: "Phone number is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone number"
                                    fullWidth
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                />
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: "Email is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="last name"
                                    fullWidth
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                                )}
                            />

                            <Controller
                                name="salary"
                                control={control}
                                rules={{ required: "Salary  is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="last name"
                                    fullWidth
                                    type="number"
                                    error={!!errors.salary}
                                    helperText={errors.salary?.message}
                                />
                                )}
                            />

                            <Controller
                                name="dateOfBirth"
                                control={control}
                                rules={{
                                    required: "Date of birth is required",
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                    label="Select date of birth"
                                    value={field.value}
                                    onChange={(newValue) => field.onChange(newValue)}
                                    //   minDate={dayjs("2020-01-01")}
                                    //   maxDate={dayjs("2030-12-31")}
                                    slotProps={{
                                        textField: {
                                        error: !!errors.dateOfBirth,
                                        helperText: errors.dateOfBirth?.message,
                                        },
                                    }}
                                    />
                                )}
                                />

                                <Controller
                                    name="joiningDate"
                                    control={control}
                                    rules={{
                                        required: "Joining date is required",
                                    }}
                                    render={({ field }) => (
                                        <DatePicker
                                        label="Select joining date"
                                        value={field.value}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        //   minDate={dayjs("2020-01-01")}
                                        //   maxDate={dayjs("2030-12-31")}
                                        slotProps={{
                                            textField: {
                                            error: !!errors.joiningDate,
                                            helperText: errors.joiningDate?.message,
                                            },
                                        }}
                                        />
                                    )}
                                />

                                <Controller
                                        name="departmentId"
                                        control={control}
                                        rules={{ 
                                            required: "Department is required",
                                            validate: (value) => value !== 0 || "Department is required"
                                            }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Department"
                                            fullWidth
                                            error={!!errors.departmentId}
                                            helperText={errors.departmentId?.message}

                                        >
                                            <MenuItem value={0}>Select Department</MenuItem>
                                            {departments?.map((department) => (
                                            <MenuItem key={department.id} value={department.id}>
                                                {department.departmentName}
                                            </MenuItem>
                                            ))}
                                        </TextField>
                                        )}
                                    />

                                <Typography variant="subtitle1" mt={2} mb={1}>
                                Select Manager
                                </Typography>
                                
                                 <Controller
                                        name="managerId"
                                        control={control}
                                        // rules={{ 
                                        //     required: "Please choose a manager required",
                                        //     validate: (value) => value !== 0 || "manager is required"
                                        //     }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Manager"
                                            fullWidth
                                            error={!!errors.managerId}
                                            helperText={errors.managerId?.message}

                                        >
                                            <MenuItem value={0}>Select Manager</MenuItem>
                                            {managers?.map((manager) => (
                                            <MenuItem key={manager.id} value={manager.id}>
                                                {manager.firstName} {manager.lastName}
                                            </MenuItem>
                                            ))}
                                        </TextField>
                                        )}
                                    />

                                
                        </CardContent>
                    </Card>
                    <Button variant="contained" type="submit">
                        Add Employee
                    </Button>
                </form>
            </LocalizationProvider>
            

        </Container>
    )
}