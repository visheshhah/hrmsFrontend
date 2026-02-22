import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Card, CardContent, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { openDocumentFileE } from "../../api/file.api";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import type { ErrorResponse } from "../../utils/commonInterface";
import { getDocumentTypes, getEmployeeDocuments, getEmployeeDocumentsByEmployeeId, uploadTravelDocument, type DocumentType, type TravelDocumentResponse, type UploadTravelDocumentRequest } from "../../api/document.api";

export default function UploadDocument(){

    const[documents, setDocuments] = useState<TravelDocumentResponse[]>([]);
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>();
    
    const { travelPlanId, employeeId } = useParams();
    const navigate  = useNavigate();

    //
        const [documentFile, setDocumentFile] = useState<File | null>(null);
        const [loading, setLoading] = useState(false);

        const handleDocumentChange = (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            if (e.target.files && e.target.files[0]) {
            setDocumentFile(e.target.files[0]);
            }
        };

        const {
            reset,
            control,
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<UploadTravelDocumentRequest>(
            { defaultValues: { documentTypeId: "" } }
        );

        const onSubmit = async (data: UploadTravelDocumentRequest) => {
            if (!documentFile) {
                toast.error("Please upload document");
                return;
            }
            try {
                setLoading(true);
                data.employeeId = Number(employeeId);
                await uploadTravelDocument(Number(travelPlanId), data, documentFile)

                toast.success("Document uploaded successfully");
                reset();
                setDocumentFile(null);
                //navigate("/dashboard/job");
            } catch (error: unknown) {
                    if(axios.isAxiosError<ErrorResponse>(error)){
                            const message = error.response?.data.message || "Failed to upload document";
                            toast.error(message);
                    }else{
                        toast.error("Something went wrong");
                    }
            }finally{
                setLoading(false)
            }
        };


        useEffect(() => {
            getDocumentTypes()
            .then((data) => setDocumentTypes(data))
        },[]);


    //
    useEffect(() => {
         getEmployeeDocumentsByEmployeeId(Number(employeeId),Number(travelPlanId))
            .then((data) => setDocuments(data))
            .catch(() => toast.error("Failed to load documents"))
    }, []);

    return(
        <Box>
                <Card>
                    <CardContent>
                        <Typography variant="h6" m={3}>
                            Submit Document
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        sx={{ mb: 1 }}
                    >

                        <Grid size={{ xs: 6 }}>
                            <Controller
                                name="documentTypeId"
                                control={control}
                                rules={{ required: "Document type is required" }}
                                render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Document"
                                    fullWidth
                                    error={!!errors.documentTypeId}
                                    helperText={errors.documentTypeId?.message}

                                >
                                    <MenuItem value="">Select document type</MenuItem>
                                    {documentTypes?.map((document) => (
                                    <MenuItem key={document.id} value={document.id}>
                                        {document.name}
                                    </MenuItem>
                                    ))}
                                </TextField>
                                )}
                            />
                            </Grid>

    
                    </Grid>
                    {/* Upload Document */}
                    {!documentFile ? (
                        <Button component="label" variant="outlined" sx={{ mt: 2 }}>
                        Upload Document
                        <input
                            type="file"
                            hidden
                            onChange={handleDocumentChange}
                        />
                        </Button>
                    ) : (
                        <Box mt={2}>
                        <Typography variant="body2">
                            Selected: <strong>{documentFile.name}</strong>
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
                                onChange={handleDocumentChange}
                            />
                            </Button>
            
                            <Button
                            size="small"
                            color="error"
                            onClick={() => setDocumentFile(null)}
                            >
                            Remove
                            </Button>
                        </Box>
                        </Box>
                    )}
                <div>
                    <Button sx={{ mt: 2}} variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
        
            </form>
                    </CardContent>
                </Card>

                <Card sx={{ mt: 4}}>
                    <Typography variant="h6" m={3}>
                        Documents
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