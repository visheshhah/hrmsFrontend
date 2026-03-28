import { useEffect, useState } from "react"
import { getEmployeeById, type EmployeeResponse } from "../../api/employee.api"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTravelPlanByEmployeeId, type TravelPlanResponse } from "../../api/travel.api";
import { Box, Button, Card, CardContent,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ManagerTravelPlanTabs from "./ManagerTravelPlanTabs";

export default function ManagerEmployeeDetail(){
    const[employee, setEmployee] = useState<EmployeeResponse>();
    const[travelPlans, setTravelPlans] = useState<TravelPlanResponse[]>([]);
    const navigate = useNavigate();

    const { employeeId } = useParams();


    useEffect(() => {
            getEmployeeById(Number(employeeId))
            .then((data) => setEmployee(data))
            .catch(() => toast.error("Failed to load employee detail"));
        }, []);

    useEffect(() => {
            getTravelPlanByEmployeeId(Number(employeeId))
            .then((data) => setTravelPlans(data))
            .catch(() => toast.error("Failed to load employee's travel detail"));
        }, []);
        
    return(
        <Box>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h5">{`${employee?.firstName} ${employee?.lastName}`}</Typography>
                    <Typography color="text.secondary" mb={2}>
                        {employee?.designation} • {employee?.department}
                    </Typography>
                 </CardContent>
            </Card>

           
            <ManagerTravelPlanTabs employeeId={Number(employeeId)}/>
      
        </Box>
    );
}