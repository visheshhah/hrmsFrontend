import { Button, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EmployeeTravelHome() {
  const navigate = useNavigate();

  return (
    <>
      
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent>
              <h3>Submit Expense</h3>
              <Button
                variant="outlined"
                onClick={() => navigate("/dashboard/Etravel/Elist")}
              >
                Go
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
            <Card>
              <CardContent>
                <h3>Submit Document</h3>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/dashboard/Etravel/Dlist")}
                >
                  Go
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card>
              <CardContent>
                <h3>View Travels</h3>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/dashboard/Etravel/travels")}
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