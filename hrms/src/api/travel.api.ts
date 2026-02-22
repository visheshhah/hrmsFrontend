import axiosInstance from "./axiosInstance";
import type { EmployeeResponse } from "./employee.api";

export type TravelPlanRequest= {
    title: string;
    description: string;
    sourceLocation: string;
    destinationLocation: string;
    isInternational: boolean;
    startDate: string | undefined;
    endDate: string | undefined;
    employees: EmployeeTravel[];
}

export type EmployeeTravel={
    employeeId: number;
}

export type TravelPlanResponse={
    travelPlanId: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    sourceLocation: string;
    destinationLocation: string;
    isInternational: boolean;
    createdAt: string;
    createdById: number;
}


export const createTravelPlan = async (data: TravelPlanRequest): Promise<TravelPlanResponse> => {
    const res = await axiosInstance.post<TravelPlanResponse>("/travel/create", data);
    return res.data;
}

export const getAllPlans = async (): Promise<TravelPlanResponse[]> => {
    const res = await axiosInstance.get<TravelPlanResponse[]>("/travel");
    return res.data;
}

export const getTravelPlanByid = async (id: number): Promise<TravelPlanResponse> => {
    const res = await axiosInstance.get<TravelPlanResponse>(`/travel/${id}`);
    return res.data;
}

export const getEmployeeTravelPlans = async (): Promise<TravelPlanResponse[]> => {
    const res = await axiosInstance.get<TravelPlanResponse[]>("/travel/employee");
    return res.data;
}

export const getTravelParticipants = async (id: number): Promise<EmployeeResponse[]> => {
    const res = await axiosInstance.get<EmployeeResponse[]>(`/travel/${id}/participants`);
    return res.data;
}