import { Button, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RoleHome() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent>
            <h3>Manage User Roles</h3>
            <Button
              variant="outlined"
              onClick={() => navigate("/dashboard/role/all")}
            >
              Go
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}