import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getManagerialChain,
  getEmployeesByManagerId,
} from "../../api/employee.api";
import type { EmployeeResponse } from "../../api/employee.api";
import EmployeeNodeCard from "./EmployeeNodeCard";
 
export default function EmployeeChartPage() {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const [chain, setChain] = useState<EmployeeResponse[]>([]);
  const [directReports, setDirectReports] = useState<EmployeeResponse[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    if (!id) return;
 
    const fetchData = async () => {
      try {
        setLoading(true);
 
        const [chainData, reportsData] = await Promise.all([
          getManagerialChain(Number(id)),
          getEmployeesByManagerId(Number(id)),
        ]);
 
        setChain(chainData);
        setDirectReports(reportsData);
      } catch {
        toast.error("Failed to load organization data");
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
  }, [id]);
 
  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        mb={6}
    >
        <Typography variant="h5">
            
        </Typography>
        {chain.map((employee, index) => (
            <Box
                key={employee.id}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
            <EmployeeNodeCard
                {...employee}
                isSelected={index === chain.length-1}
                onClick={() =>
                navigate(`/dashboard/chart/${employee.id}`)
                }
            />
        
            {index !== chain.length - 1 && (
                <Box
                    sx={{
                        width: "2px",
                        height: "30px",
                        backgroundColor: "grey.400",
                        mt: 1,
                    }}
                />
            )}
            </Box>
        ))}

        { directReports.length > 0 && (
            <Box display="flex" flexDirection="column" alignItems="center" >
  
                <Box
                    sx={{
                    width: "2px",
                    height: "30px",
                    backgroundColor: "grey.400",
                    }}
                />
                
                <Box
                    sx={{
                    width: "100%",
                    maxWidth: 900,
                    height: "2px",
                    backgroundColor: "grey.400",
                    }}
                />
                
                <Box
                    display="flex"
                    justifyContent="center"
                    gap={4}
                    mt={2}
                    flexWrap="wrap"
                    width="100%"
                    maxWidth={900}
                >
                    {directReports.map((employee) => (
                    <Box
                        key={employee.id}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Box
                        sx={{
                            width: "2px",
                            height: "20px",
                            backgroundColor: "grey.400",
                            mb: 1,
                        }}
                        />
                
                        <EmployeeNodeCard
                        {...employee}
                        onClick={() =>
                            navigate(`/dashboard/chart/${employee.id}`)
                        }
                        />
                    </Box>
                    ))}
                </Box>
                </Box>
        )}
        </Box>
 
  );
}