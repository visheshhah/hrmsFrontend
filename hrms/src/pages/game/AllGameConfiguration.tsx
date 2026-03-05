import { useEffect, useState } from "react"
import { getGameConfiguration, type GameConfigResponse } from "../../api/slot.api"
import { toast } from "react-toastify";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AllGameConfiguration(){
    const [configs, setConfigs] = useState<GameConfigResponse[]>();
    const navigate = useNavigate();

    useEffect(() => {
        getGameConfiguration()
        .then((data) => setConfigs(data))
        .catch(() => toast.error("Cannot load configuration"));
    },[]);

    return(
        <>
        <Box>
            <Button sx={{my:2}} variant="outlined" onClick={() =>navigate(-1)}>
                Back
            </Button>

            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Operating Time</TableCell>
                    <TableCell>Maximum players</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {configs?.map((config) => (
                    <TableRow key={config.id}>
                        <TableCell>{config.gameName}</TableCell>
                        <TableCell>{config.startTime} - {config.endTime}</TableCell>
                        <TableCell>{config.maxPlayers}</TableCell>
                        <TableCell>{config.slotDuration}</TableCell>
                        <TableCell align="center">
                        <Button onClick={() => navigate(`/dashboard/game/configure/update/${config.id}`)} variant="contained">
                            Update
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}

                    {configs?.length === 0 && (
                    <TableRow key="no-configs">
                        <TableCell colSpan={6} align="center">
                        No configurations found
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </TableContainer>
        </Box>
        </>
    )
}