import { Avatar, Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTravelPlanDetailByid, type TravelPlanDetail } from "../../api/travel.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getEmployeeDocumentsByEmployeeId, type TravelDocumentResponse } from "../../api/document.api";
import { openDocumentFileE } from "../../api/file.api";


export default function ManagerEmployeeTravelDetail(){

    const { employeeId, travelPlanId } = useParams();
    const navigate = useNavigate();

    const [travel, setTravel] = useState<TravelPlanDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const[documents, setDocuments] = useState<TravelDocumentResponse[]>([]);


    useEffect(() => {
        if (!travelPlanId) return;
    
        const fetchTravel = async () => {
          try {
            const data = await getTravelPlanDetailByid(Number(travelPlanId));
            setTravel(data);
          } catch {
            toast.error("Failed to load travel details");
          } finally {
            setLoading(false);
          }
        };
    
        fetchTravel();
      }, [travelPlanId]);

      useEffect(() => {
               getEmployeeDocumentsByEmployeeId(Number(employeeId), Number(travelPlanId))
                  .then((data) => setDocuments(data))
                  .catch(() => toast.error("Failed to load documents"))
    }, []);

     if (loading) {
        return (
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <CircularProgress />
          </Box>
        );
      }
    
      if (!travel) return null;
    
    return(
         <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 2 }}
                >
                    Back
                </Button>

                <Card>
                    <CardContent>
                    <Typography variant="h5" fontWeight={600} mb={1}>
                        {travel.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Created At: {new Date(travel.createdAt).toLocaleString()}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" mb={2}>
                        {travel.description}
                    </Typography>

                    <Stack spacing={1}>
                        <Typography>
                        <strong>Source:</strong> {travel.sourceLocation}
                        </Typography>

                        <Typography>
                        <strong>Destination:</strong> {travel.destinationLocation}
                        </Typography>

                        <Typography>
                        <strong>Start Date:</strong>{" "}
                        {new Date(travel.startDate).toLocaleDateString()}
                        </Typography>

                        <Typography>
                        <strong>End Date:</strong>{" "}
                        {new Date(travel.endDate).toLocaleDateString()}
                        </Typography>

                        <Typography component="div">
                        <strong>Status:</strong>{" "}
                        <Chip label={travel.status} size="small" />
                        </Typography>

                        <Typography>
                        <strong>International Travel:</strong>{" "}
                        {travel.isInternational ? "Yes" : "No"}
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* Participants */}
                    <Typography variant="h6" mb={2}>
                        Participants
                    </Typography>

                    {travel.participants.length === 0 ? (
                        <Typography color="text.secondary">
                        No participants added
                        </Typography>
                    ) : (
                        <Stack spacing={2}>
                        {travel.participants.map((emp) => (
                            <Card key={emp.id} variant="outlined">
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar>
                                    {emp.firstName.charAt(0)}
                                </Avatar>

                                <Box>
                                    <Typography fontWeight={600}>
                                    {emp.firstName} {emp.lastName}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                    {emp.designation} • {emp.department}
                                    </Typography>
                                </Box>
                                </Stack>
                            </CardContent>
                            </Card>
                        ))}
                        </Stack>
                    )}
                    </CardContent>
                </Card>

                <Card sx={{ mt: 4}}>
                    <Typography variant="h6" m={3}>
                        Employee Documents
                    </Typography>

                        <TableContainer component={Paper}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Uploaded by</TableCell>
                            <TableCell>Owner type</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {documents?.map((doc) => (
                            <TableRow key={doc.travelDocumentId}>
                                <TableCell>{doc.documentTypeName}</TableCell>
                                <TableCell>
                                    {doc.uploadedByName}
                                </TableCell>
                                <TableCell>{doc.uploadedByRole}</TableCell>

                                <TableCell align="center">
                                <Button onClick={() => openDocumentFileE(doc.travelDocumentId)} variant="contained">
                                    View Document
                                </Button>
                                </TableCell>
                            </TableRow>
                            ))}

                            {documents?.length === 0 && (
                            <TableRow key="no-documents">
                                <TableCell colSpan={6} align="center">
                                No Documents found
                                </TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
    </Box>
    )
}