import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from "@mui/material"
import { login } from "../../api/auth.api"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

interface LoginRequest {
    username: string;
    password: string;
}

interface ErrorResponse{
    message: string;
    code: number;
    timestamp: string;
}


export default function Login(){
    const { register, handleSubmit } = useForm<LoginRequest>();
    const navigate = useNavigate();
    //
    const { login: setAuth } = useAuth();

    const onSubmit = async (data: LoginRequest) => {
           try{
                const token: string = await login(data);
                //localStorage.setItem("token", token);
                setAuth(token);
                toast.success("Login successful");
                navigate("/dashboard");

           }catch(error: unknown){
                if(axios.isAxiosError<ErrorResponse>(error)){
                const message = error.response?.data.message || "Login failed";
                toast.error(message);
                }else{
                    toast.error("Something went wrong");
                }
                    
           }
    }

    return(
          <Container maxWidth="xs">
            <Box mt={10}>
                <Typography variant="h5" mb={2}>
                Login
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    label="Usernam"
                    margin="normal"
                    {...register("username", { required: true })}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    {...register("password", { required: true })}
                />

                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
                </form>
            </Box>
        </Container>  
    )
}