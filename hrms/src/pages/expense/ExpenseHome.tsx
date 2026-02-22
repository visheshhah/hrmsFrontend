import { Button, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ExpenseHome() {
  const navigate = useNavigate();

  return (
    <>
      
      <Grid container spacing={2}>
        <Grid sx={{ m: 2}} size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent>
              <h3>Verify Expense</h3>
              <Button
                variant="outlined"
                onClick={() => navigate("/dashboard/expense/travel")}
              >
                Go
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}