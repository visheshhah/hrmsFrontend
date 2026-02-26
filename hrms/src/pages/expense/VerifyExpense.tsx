import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  approveExpense,
  getEmployeeExpenseDetail,
  rejectExpense,
  type EmployeeExpenseResponse,
} from "../../api/expense.api";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { openFile } from "../../api/file.api";
 
export default function VerifyExpense() {
  const { travelPlanId, employeeId ,expenseId } = useParams();
  const navigate = useNavigate();
 
  const [expense, setExpense] =
    useState<EmployeeExpenseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
 
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
 
  useEffect(() => {
    if (!expenseId) return;
 
    getEmployeeExpenseDetail(Number(expenseId))
      .then((data) => setExpense(data))
      .catch(() => toast.error("Failed to load expense details"))
      .finally(() => setLoading(false));
  }, [expenseId]);
 
  const handleApprove = async () => {
    try {
      setSubmitting(true);
 
      await approveExpense({
        expenseId: Number(expenseId),
        remark: remark.trim()  
      });
 
      toast.success("Expense approved successfully");
      navigate(`/dashboard/expense/travel/${Number(travelPlanId)}/${Number(employeeId)}/expenses`);
    } catch {
      toast.error("Failed to approve expense");
    } finally {
      setSubmitting(false);
    }
  };
 
  const handleReject = async () => {
    if (!remark.trim()) {
      setError("Remark is required when rejecting");
      return;
    }
 
    try {
      setSubmitting(true);
 
      await rejectExpense({
        expenseId: Number(expenseId),
        remark: remark.trim(),
      });
 
      toast.success("Expense rejected successfully");
      navigate(`/dashboard/expense/travel/${Number(travelPlanId)}/${Number(employeeId)}/expenses`);
    } catch {
      toast.error("Failed to reject expense");
    } finally {
      setSubmitting(false);
    }
  };
 
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
 
  if (!expense) {
    return <Typography>No Expense found</Typography>;
  }
 
  return (
    <Box>
      <Button onClick={() => navigate("/dashboard/job/list")}>
        Back
      </Button>
 
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Typography>
                <strong>Description:</strong> {expense.description}
              </Typography>
            </Grid>
 
            <Grid size={{ xs: 6 }}>
              <Typography>
                <strong>Category:</strong> {expense.categoryName}
              </Typography>
            </Grid>
 
            <Grid size={{ xs: 6 }}>
              <Typography>
                <strong>Amount:</strong> {expense.amount}
              </Typography>
            </Grid>
 
            <Grid size={{ xs: 6 }}>
              <Typography>
                <strong>View Proof:</strong>
              </Typography>
              {expense.proofs?.length > 0 && (
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={() => openFile(expense.proofs[0].id)}
                >
                  View Proof
                </Button>
              )}
            </Grid>
          </Grid>
 
          <Divider sx={{ my: 3 }} />
 
          {/* Remark Field */}
          <TextField
            fullWidth
            label="Remark"
            multiline
            rows={3}
            value={remark}
            onChange={(e) => {
              setRemark(e.target.value);
              setError("");
            }}
            error={!!error}
            helperText={error}
          />
 
          <Divider sx={{ my: 3 }} />
 
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="success"
              disabled={submitting}
              onClick={handleApprove}
            >
              Approve
            </Button>
 
            <Button
              variant="contained"
              color="error"
              disabled={submitting}
              onClick={handleReject}
            >
              Reject
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}