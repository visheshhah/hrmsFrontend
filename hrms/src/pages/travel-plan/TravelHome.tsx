import { Button, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoleGuard from "../../components/RoleGuard";

export default function TravelHome() {
  const navigate = useNavigate();

  return (
    <>
      
    <RoleGuard role="ROLE_HR">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent>
              <h3>Manage Travel Plans</h3>
              <Button
                variant="outlined"
                onClick={() => navigate("/dashboard/travel/list")}
              >
                Go
              </Button>
            </CardContent>
          </Card>
        </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card>
              <CardContent>
                <h3>Create Travel Plan</h3>
                <Button
                  variant="contained"
                  onClick={() => navigate("/dashboard/travel/create")}
                  >
                  Create
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </RoleGuard>
    </>
  );
}