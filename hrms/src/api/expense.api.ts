import axiosInstance from "./axiosInstance";

export type SubmitExpense = {
    description: string;
    categoryId: number | "";
    amount: number;
}

export const submitExpense = async (
    travelPlanId: number,
    data: SubmitExpense,
    file: File
):Promise<number> => {
    const formData = new FormData();

    formData.append(
        "data",
        new Blob([JSON.stringify(data)],{
            type: "application/json",
        })
    );
        
    formData.append("file", file);

    const res = await axiosInstance.post(`/expense/${travelPlanId}/add-expense`, formData);

    return res.data;


};

export type EmployeeExpenseResponse = {
    id: number;
    travelPlanId: number;
    remark?: number;
    categoryName: string;
    expenseStatus: string;
    amount: number;
    description: string;
    proofs: ExpenseProof[]
}

export type ExpenseProof = {
    id: number;
    fileName: string;
}

export const getExployeeExpenses = async (id: number): Promise<EmployeeExpenseResponse[]> => {
    const res = await axiosInstance.get<EmployeeExpenseResponse[]>(`expense/${id}`);
    return res.data;
}


export const getExployeeExpensesByEmployeeId = async (travelPlanId: number, employeeId: number): Promise<EmployeeExpenseResponse[]> => {
    const res = await axiosInstance.get<EmployeeExpenseResponse[]>(`/hr/expense/${travelPlanId}/${employeeId}`);
    return res.data;
}

export const getEmployeeExpenseDetail = async (expenseId: number): Promise<EmployeeExpenseResponse> => {
    const res = await axiosInstance.get<EmployeeExpenseResponse>(`/hr/expense/${expenseId}`);
    return res.data;
}
// public class EmployeeExpenseResponseDto {
//     private Long id;
//     private Long travelPlanId;
//     private String remark;
//     private String categoryName;
//     private ExpenseStatus expenseStatus;
//     private BigDecimal amount;
//     private String description;

//     private List<ExpenseProofDto> proofs;
// }

// public class ExpenseProofDto {
//     private Long id;
//     private String fileName;
// }

export type HrDecision = {
    expenseId: number;
    remark?: string;
}

export type HrDecisionResponse = {
    id: number;
    status: string;
}

export const rejectExpense = async (data: HrDecision): Promise<HrDecisionResponse> => {
    const res = await axiosInstance.post<HrDecisionResponse>("/hr/expense/reject", data);
    return res.data;
}

export const approveExpense = async (data: HrDecision): Promise<HrDecisionResponse> => {
    const res = await axiosInstance.post<HrDecisionResponse>("/hr/expense/approve", data);
    return res.data;
}