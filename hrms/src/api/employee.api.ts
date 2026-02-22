import axiosInstance from "./axiosInstance";

export interface EmployeeResponse{
    id: number;
    firstName: string;
    lastName: string;
    designation: string;
    department: string;
    managerId: number | null;
}

export const getEmployees = async (): Promise<EmployeeResponse []> => {
    const res = await axiosInstance.get<EmployeeResponse []>("/employee");
    return res.data;
}

export const getEmployeeById = async (employeeId: number): Promise<EmployeeResponse> => {
    const res = await axiosInstance.get<EmployeeResponse>(`/employee/${employeeId}`);
    return res.data;
}

export const getManagerialChain = async (employeeId: number): Promise<EmployeeResponse[]> => {
    const res = await axiosInstance.get<EmployeeResponse[]>(`/employee/${employeeId}/manager-chain`);
    return res.data;
}

export const getEmployeesByManagerId = async (employeeId: number): Promise<EmployeeResponse[]> => {
    const res = await axiosInstance.get<EmployeeResponse[]>(`/employee/manager/${employeeId}`);
    return res.data;
}