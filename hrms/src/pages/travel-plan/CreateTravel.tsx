import { useState, useEffect } from "react";
import { getEmployees } from "../../api/employee.api";
import { Controller, useForm } from "react-hook-form";
import { type EmployeeResponse } from "../../api/employee.api";
import { createTravelPlan, type TravelPlanRequest } from "../../api/travel.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Checkbox, Container, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

interface FormValues {
  title: string;
  description: string;
  sourceLocation: string;
  destinationLocation: string;
  isInternational: boolean;
  startDate: Dayjs | null;
    endDate: Dayjs | null;
  employees: number[];
}

export default function CreateTravel(){
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<EmployeeResponse []|null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();


    useEffect(() => {
         getEmployees()
            .then((res) => setEmployees(res))
            .catch(() => toast.error("Failed to load employees"));
    }, []);

    const onSubmit = async (data: FormValues) => {
        try {
            const payload: TravelPlanRequest = {
            title: data.title,
            description: data.description,
            sourceLocation: data.sourceLocation,
            destinationLocation: data.destinationLocation,
            isInternational: data.isInternational ? data.isInternational : false,
            startDate: data.startDate?.format("YYYY-MM-DD"),
            endDate: data.endDate?.format("YYYY-MM-DD"),
            employees: data.employees.map((id) => ({
                employeeId: id,
            })),
            };
        
            await createTravelPlan(payload);
        
            toast.success("Travel plan created successfully");
            navigate("/dashboard/travel/"); 
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
                Create Travel Plan
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>


                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>

                            <Controller
                                name="title"
                                control={control}
                                rules={{ required: "Title is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Title"
                                    fullWidth
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                                )}
                            />
                    
                    
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: "Description is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                                )}
                            />
                    
                    
                            <Controller
                                name="sourceLocation"
                                control={control}
                                rules={{ required: "Source location is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Source Location"
                                    fullWidth
                                    error={!!errors.sourceLocation}
                                    helperText={errors.sourceLocation?.message}
                                />
                                )}
                            />
                    
                            <Controller
                                name="destinationLocation"
                                control={control}
                                rules={{ required: "Destination location is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Destination Location"
                                    fullWidth
                                    error={!!errors.destinationLocation}
                                    helperText={errors.destinationLocation?.message}
                                />
                                )}
                            />

                            <Controller
                                name="startDate"
                                control={control}
                                rules={{
                                    required: "Start Date is required",
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                    label="Select start date"
                                    value={field.value}
                                    onChange={(newValue) => field.onChange(newValue)}
                                    //   minDate={dayjs("2020-01-01")}
                                    //   maxDate={dayjs("2030-12-31")}
                                    slotProps={{
                                        textField: {
                                        error: !!errors.startDate,
                                        helperText: errors.startDate?.message,
                                        },
                                    }}
                                    />
                                )}
                                />

                                <Controller
                                    name="endDate"
                                    control={control}
                                    rules={{
                                        required: "End Date is required",
                                    }}
                                    render={({ field }) => (
                                        <DatePicker
                                        label="Select end date"
                                        value={field.value}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        //   minDate={dayjs("2020-01-01")}
                                        //   maxDate={dayjs("2030-12-31")}
                                        slotProps={{
                                            textField: {
                                            error: !!errors.endDate,
                                            helperText: errors.endDate?.message,
                                            },
                                        }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="isInternational"
                                    control={control}
                                    render={({ field }) => (
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                          />
                                        }
                                        label="International Travel"
                                      />
                                    )}
                                />

                                <Typography variant="subtitle1" mt={2} mb={1}>
                                Select Employees
                                </Typography>
                                
                                <Controller
                                name="employees"
                                control={control}
                                rules={{ required: "Please select at least one employee" }}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <FormGroup>
                                    {employees?.map((emp) => (
                                        <FormControlLabel
                                        key={emp.id}
                                        control={
                                            <Checkbox
                                            checked={field.value?.includes(emp.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                field.onChange([...field.value, emp.id]);
                                                } else {
                                                field.onChange(
                                                    field.value.filter((id: number) => id !== emp.id)
                                                );
                                                }
                                            }}
                                            />
                                        }
                                        label={`${emp.firstName} ${emp.lastName} (${emp.designation})`}
                                        />
                                    ))}
                                    </FormGroup>
                                )}
                                />
                                
                                {errors.employees && (
                                <Typography color="error" variant="body2">
                                    {errors.employees.message}
                                </Typography>
                                )}

                                
                        </CardContent>
                    </Card>
                    <Button variant="contained" type="submit">
                        Create Travel Plan
                    </Button>
                </form>
            </LocalizationProvider>
            

        </Container>
    );
}