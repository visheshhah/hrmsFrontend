import { useEffect, useState } from "react"
import { getExployeeExpenses, getTotalApprovedAmountByEmployee, getTotalClaimedAmountByEmployee, submitExpense, type EmployeeExpenseResponse, type SubmitExpense } from "../../api/expense.api"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Card, CardContent, Divider, Grid, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { openFile } from "../../api/file.api";
import type { CategoryType } from "../expense/Test3";
import { getCategoryType } from "../../api/category.api";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import type { ErrorResponse } from "../../utils/commonInterface";
import EmployeeExpenseRecords from "./empense-list/EmployeeExpenseRecords";

export default function Expense(){

    const [claimedExpense, setClaimedExpense] = useState(0);
    const [approvedExpense, setApprovedExpense] = useState(0);

    const[expenses, setExpenses] = useState<EmployeeExpenseResponse[]>([]);
    const { travelPlanId } = useParams();
    const navigate  = useNavigate();

    //
     const [categories, setCategories] = useState<CategoryType[]>([]);
    const [expenseFile, setExpenseFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleExpenseChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files && e.target.files[0]) {
        setExpenseFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        getCategoryType()
        .then((data) => {
            setCategories(data);
        })
        .catch(() => toast.error("Failed to load category"));
    }, []);

    useEffect(() => {
                getTotalClaimedAmountByEmployee(Number(travelPlanId))
                    .then((data) => setClaimedExpense(data))
            })
    
    useEffect(() => {
                getTotalApprovedAmountByEmployee(Number(travelPlanId))
                    .then((data) => setApprovedExpense(data))
    })

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubmitExpense>(
        { defaultValues: { 
            description: "",
            amount: 0,
            categoryId: 0 
        } }
    );

    const onSubmit = async (data: SubmitExpense) => {
        if (!expenseFile) {
            toast.error("Expense proof is required");
            return;
        }
        try {
            setLoading(true);
            await submitExpense(Number(travelPlanId), data, expenseFile);
            toast.success("Expense submitted successfully");
            reset();
            setExpenseFile(null);
            //navigate("/dashboard/job");
        } catch (error: unknown) {
                if(axios.isAxiosError<ErrorResponse>(error)){
                        const message = error.response?.data.message || "Failed to submit expense";
                        toast.error(message);
                }else{
                    toast.error("Something went wrong");
                }
        }finally{
            setLoading(false)
        }
    };

    //
    useEffect(() => {
         getExployeeExpenses(Number(travelPlanId))
            .then((data) => setExpenses(data))
            .catch(() => toast.error("Failed to load expense"))
    }, []);

    return(
        <Box>
                <Card>
                    <CardContent>
                        <Typography variant="h6" m={3}>
                            Submit Expense
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                sx={{ mb: 1 }}
                            >
                                <Grid size={{ xs: 5 }} >
                                    <Controller
                                        name="description"
                                        control={control}
                                        rules={{ required: "Description is required" }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Description"
                                            fullWidth
                                            error={!!errors.description}
                                            helperText={errors.description?.message}
                                        />
                                        )}
                                    />
                                </Grid>

                                <Grid size={{ xs: 6 }} >
                                    <Controller
                                        name="amount"
                                        control={control}
                                        rules={{ required: "Amount is required" }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Amount"
                                            fullWidth
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            error={!!errors.amount}
                                            helperText={errors.amount?.message}
                                        />
                                        )}
                                    />
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <Controller
                                        name="categoryId"
                                        control={control}
                                        rules={{ 
                                            required: "Category is required",
                                            validate: (value) => value !== 0 || "Category is required"
                                            }}
                                        render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Category"
                                            fullWidth
                                            error={!!errors.categoryId}
                                            helperText={errors.categoryId?.message}

                                        >
                                            <MenuItem value={0}>Select Category</MenuItem>
                                            {categories?.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.categoryName}
                                            </MenuItem>
                                            ))}
                                        </TextField>
                                        )}
                                    />
                                    </Grid>

            
                            </Grid>
                            {/* Upload Resume */}
                            {!expenseFile ? (
                                <Button component="label" variant="outlined" sx={{ mt: 2 }}>
                                Upload Expense Proof
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleExpenseChange}
                                />
                                </Button>
                            ) : (
                                <Box mt={2}>
                                <Typography variant="body2">
                                    Selected: <strong>{expenseFile.name}</strong>
                                </Typography>
                    
                                <Box mt={1} display="flex" gap={1}>
                                    <Button
                                    component="label"
                                    size="small"
                                    variant="outlined"
                                    >
                                    Change
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleExpenseChange}
                                    />
                                    </Button>
                    
                                    <Button
                                    size="small"
                                    color="error"
                                    onClick={() => setExpenseFile(null)}
                                    >
                                    Remove
                                    </Button>
                                </Box>
                                </Box>
                            )}
                        <div>
                            <Button sx={{mt:2}} variant="contained" type="submit">
                                Submit
                            </Button>
                        </div>
                
                    </form>
                    </CardContent>
                </Card>

                <Stack
                    direction="row"
                    gap={2}
                     sx={{ mt: 4}}
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

                <EmployeeExpenseRecords/>
            </Box>
    )
}