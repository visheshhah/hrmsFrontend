import { useNavigate } from "react-router-dom"
import { getAllNotifications, type NotificationListResponse } from "../../api/notification.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, Box, Card, CardActionArea, CardContent, Divider, Stack, Typography } from "@mui/material";

export default function NotificationList(){
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<NotificationListResponse[]>();

    useEffect(() => {
        getAllNotifications()
        .then((data) => setNotifications(data))
        .catch(() => toast.error("Error loading notifications"));
    }, []);

    const MAX_LENGTH = 100;
    return(
        <>
        <Typography variant="h5">Notifications</Typography>
         <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
                {notifications?.map((notification) => 
                (
                    <Card key={notification.id} sx={{ mb: 3 }}>
                        <CardActionArea component="div" onClick={() => navigate(`/dashboard/notification/${notification.id}`)}>

                        <CardContent>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar>{notification.sender === null ? "System" : notification.sender?.charAt(0)}</Avatar>
                                    <Box>
                                        <Typography fontWeight={600}>
                                        {notification.sender === null ? "System" : notification.sender}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                        {new Date(notification.createdAt).toLocaleString()}
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
                                {notification.title}
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {
                                    notification.message.length > MAX_LENGTH
                                    ? notification.message.substring(0, MAX_LENGTH) + "..."
                                    : notification.message
                                }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                ))}
                </Box>
                {
                    notifications?.length == 0 && (
                        <Typography>
                            No notifications found
                        </Typography>
                    )
                }

        </>
    )
}