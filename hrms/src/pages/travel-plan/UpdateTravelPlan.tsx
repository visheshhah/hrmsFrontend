import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployees, type EmployeeResponse } from "../../api/employee.api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getTravelPlanDetailByid, updateTravelPlan, type UpdateTravelPlanRequest } from "../../api/travel.api";
import dayjs from "dayjs";
import { Box, Button, Card, CardContent, Checkbox, CircularProgress, Container, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface EditFormValues {
  title: string;
  description: string;
  sourceLocation: string;
  destinationLocation: string;
  isInternational: boolean;
  startDate: Dayjs | null;
    endDate: Dayjs | null;
  employees: number[];
}

export default function UpdateTravelPlan(){
    const navigate = useNavigate();
    const { travelPlanId } = useParams();
    const [employees, setEmployees] = useState<EmployeeResponse []|null>(null);
    //const [travelPlan, setTravelPlan] = useState<TravelPlanDetail>();
    const [loading, setLoading] = useState(true);


    const {
                reset,
                control,
                handleSubmit,
                formState: { errors },
        } = useForm<EditFormValues>();


    // useEffect(() => {
    //      getEmployees()
    //         .then((res) => setEmployees(res))
    //         .catch(() => toast.error("Failed to load employees"));
    // }, []);

    useEffect(() => {
        if (!travelPlanId) return;

       const fetchData = async () => {
               try {
                 const [travelRes, employeeRes] = await Promise.all([
                   getTravelPlanDetailByid(Number(travelPlanId)),
                   getEmployees(),
                 ]);
           
                 setEmployees(employeeRes);
           
                 reset({
                   title: travelRes.title,
                   description: travelRes.description,
                   sourceLocation: travelRes.sourceLocation,
                   destinationLocation: travelRes.destinationLocation,
                   isInternational: travelRes.isInternational,
                   startDate: dayjs(travelRes.startDate),
                   endDate: dayjs(travelRes.endDate),
                   employees: travelRes.participants.map((p) => p.id),
                 });
               } catch {
                 toast.error("Failed to load data");
               } finally {
                 setLoading(false);
               }
             };
           
             fetchData();

    }, [travelPlanId, reset]);



  const onSubmit = async (data: EditFormValues) => {
          if(data.startDate && data.endDate){
              if(data.endDate.isBefore(data.startDate)){
                  toast.error("End date must be after start date");
                  return;
              }
          }
          try {
              const payload: UpdateTravelPlanRequest = {
                   title: data.title,
                   description: data.description,
                   sourceLocation: data.sourceLocation,
                   destinationLocation: data.destinationLocation,
                   isInternational: data.isInternational,
                   startDate: data.startDate?.format("YYYY-MM-DD"),
                    endDate: data.endDate?.format("YYYY-MM-DD"),
                    employeeIds: data.employees.map((id) => id),
              };

            await updateTravelPlan(Number(travelPlanId), payload);
      
            toast.success("Travel plan updated");
            navigate(`/dashboard/travel/list`, { replace: true });
          } catch {
            toast.error("Failed to update travel plan");
          }
    };

    if (loading) {
        return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
            <CircularProgress />
        </Box>
        );
    }

    return(
        <Container maxWidth="lg">
            <Button variant="outlined" onClick={() =>navigate(-1)} sx={{my:2}}>
                Back
            </Button>
            <Typography variant="h5" mb={3}>
                Update Travel Plan
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>


                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Stack
                                direction="column"
                                gap={2}
                            >

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

                            </Stack>
                                
                        </CardContent>
                    </Card>
                    <Button variant="contained" type="submit">
                        Update Travel Plan
                    </Button>
                </form>
            </LocalizationProvider>
            

        </Container>
    );
}