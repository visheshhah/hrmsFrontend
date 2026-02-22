import axiosInstance from "./axiosInstance";

export interface CreateJobRequest{
    title: string;
    description: string;
    companyName: string;
    location: string;
    minExperience: number;
    maxExperience: number;
    jobType: string;
    workPlaceType: string;
}

export interface JobResponse{
    id: number;
    title: string;
    description: string;
    companyName: string;
    location: string;
    minExperience: number;
    maxExperience: number;
    jobType: string;
    workPlaceType: string;  
    status: string; 
}

export const createJob = async (data: CreateJobRequest): Promise<JobResponse> => {
    const res = await axiosInstance.post<JobResponse>("/job/create", data);
    return res.data;

}

export const getAllJobs = async (): Promise<JobResponse[]> => {
    const res = await axiosInstance.get<JobResponse[]>("/job");
    return res.data;

}

export const getJobById = async (id: number): Promise<JobResponse> => {
    const res = await axiosInstance.get<JobResponse>(`/job/${id}`);
    return res.data;

}


export interface GiveReferral{
    comment: string;
    friendName: string;
    friendEmail: string;
}

export interface ReferralResponse{
    id: number;
    comment?: string;
    friendName: string;
    friendEmail?: string;
}

export const giveReferral = async (
    jobId: number,
    data: GiveReferral,
    file: File
): Promise<ReferralResponse> => {
    const formData = new FormData();

    formData.append(
        "data",
        new Blob([JSON.stringify(data)],{
            type: "application/json",
        })
    );

    formData.append("file", file);
    
    const res = await axiosInstance.post<ReferralResponse>(`/job/${jobId}/refer`, formData);
    return res.data;
}

export type ShareJob = {
    email: string;
}

export const shareJob = async (jobId: number, data: ShareJob) => {
    const res = await axiosInstance.post(`/share/job/${jobId}`);
}