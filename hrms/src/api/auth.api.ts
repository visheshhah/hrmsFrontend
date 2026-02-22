import axiosInstance from "./axiosInstance";

interface LoginRequest {
    username: string;
    password: string;
}

type Role = "HR" | "EMPLOYEE" | "MANAGER" 

interface RegisterRequest {
    username: string;
    email:string;
    password: string;
    employeeId: number;
    roles: Role[];

}

interface SignupResponse {
  username: string;
  email: string;
}

export const login = async (data: LoginRequest): Promise<string> => {
  const response = await axiosInstance.post<string>("/auth/login", data);
  return response.data;
};

export const signup = async (data: RegisterRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>("/auth/signup", data);
  return response.data;
};