
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../../api/auth.api";
import axios from "axios";

type Role = "HR" | "EMPLOYEE" | "MANAGER" 

interface RegisterRequest {
    username: string;
    email:string;
    password: string;
    employeeId: number;
    roles: Role[];

}

interface ErrorResponse{
    message: string;
    code: number;
    timestamp: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await signup(data);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error: unknown) {
        if(axios.isAxiosError<ErrorResponse>(error)){
                const message = error.response?.data.message || "signup failed";
                toast.error(message);
        }else{
            toast.error("Something went wrong");
        }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={6}>
        <Typography variant="h5" mb={3}>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
        
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <TextField
                fullWidth
                label="Employee ID"
                type="number"
                margin="normal"
                {...register("employeeId", {
                  required: "Employee ID is required",
                  valueAsNumber : true,
                })}
                error={!!errors.employeeId}
                helperText={errors.employeeId?.message}
              />

            <Typography mt={2}>Select Roles</Typography>

            <FormGroup>
                <FormControlLabel
                    control={<Checkbox value="HR" {...register("roles")} />}
                    label="HR"
                />
                <FormControlLabel
                    control={<Checkbox value="Employee" {...register("roles")} />}
                    label="Employee"
                />
                <FormControlLabel
                    control={<Checkbox value="Manager" {...register("roles")} />}
                    label="manager"
                />
            </FormGroup>

            {errors.roles && (
                <Typography color="error" variant="body2">
                    {errors.roles.message}
                </Typography>
            )

            }

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3 }}
          >
            Register
          </Button>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{ cursor: "pointer" }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
