import { useEffect, useState } from "react";
import { getNotificationById, markAsRead, type NotificationDetailResponse } from "../../api/notification.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";

export default function NotificationDetail(){
    const navigate = useNavigate();
    const { notificationId } = useParams();
    const [notification, setNotification] = useState<NotificationDetailResponse>();

    useEffect(() => {
        getNotificationById(Number(notificationId))
        .then((data) => setNotification(data))
        .catch(() => toast.error("Error loading notification"));
    }, []);

    useEffect(() => {
        markAsRead(Number(notificationId));
    }, []);

    if(notification === null){
        return(
            <>
                <Typography>
                    Error
                </Typography>
            </>
        )
    }


    return(
        <>
        <Typography variant="h5">Notifications</Typography>
         <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
                 <Card sx={{ mb: 3 }}>

                        <CardContent>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar>{notification?.sender === null ? "System" : notification?.sender?.charAt(0)}</Avatar>
                                    <Box>
                                        <Typography fontWeight={600}>
                                        {notification?.sender === null ? "System" : notification?.sender}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                        {notification && new Date(notification.createdAt).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Stack>
                    
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            {/* Title */}
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{ mb: 1 }}
                            >
                                {notification?.title}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {
                                    notification?.message
                                }
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            
        </>
    )
}