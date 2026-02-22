import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import JobLayout from "./pages/job/JobLayout";
import JobHome from "./pages/job/JobHome";
import JobsList from "./pages/job/JobsList";
import CreateJob from "./pages/job/CreateJob";
import JobDetails from "./pages/job/JobDetails";
import TravelLayout from "./pages/travel-plan/TravelLayout";
import TravelHome from "./pages/travel-plan/TravelHome";
import TravelPlanList from "./pages/travel-plan/TravelPlanList";
import ExpenseLayout from "./pages/expense/ExpenseLayout";
import CreateTravel from "./pages/travel-plan/CreateTravel";
import TravelPlanDetails from "./pages/travel-plan/TravelPlanDetails";
import UploadDocument from "./pages/document/UploadDocument";
import EmployeeList from "./pages/chart/EmployeeList";
import EmployeeChartPage from "./pages/chart/EmployeeChartPage";
import ChartLayout from "./pages/chart/ChartLayout";
import EmployeeTravelLayout from "./pages/employee-travel-plan/EmployeeTravelLayout";
import EmployeeTravelHome from "./pages/employee-travel-plan/EmployeeTravelHome";
import EEmployeeTravelPlanList from "./pages/employee-travel-plan/EEmployeeTravelPlanList";
import Expense from "./pages/employee-travel-plan/Expense";
import DEmployeeTravelPlanList from "./pages/employee-travel-plan/DEmployeeTravelPlanList";
import Document from "./pages/employee-travel-plan/Document";
import ExpenseHome from "./pages/expense/ExpenseHome";
import ExpenseTravelPlanList from "./pages/expense/ExpenseTravelPlanList";
import ExpenseTravelPlanDetails from "./pages/expense/ExpenseTravelPlanDetails";
import HExpenseList from "./pages/expense/HExpenseList";
import VerifyExpense from "./pages/expense/VerifyExpense";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

export default function AppRoutes(){
    return(
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
        
            <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
        
            <Route element={<ProtectedRoute allowedRoles={["ROLE_HR"]} />}>
                <Route path="travel" element={<TravelLayout />}>
                <Route index element={<TravelHome />} />
                <Route path="list" element={<TravelPlanList />} />
                <Route path="create" element={<CreateTravel />} />
                <Route path=":travelPlanId" element={<TravelPlanDetails />} />
                <Route
                    path=":travelPlanId/:employeeId/assign-document"
                    element={<UploadDocument />}
                />
                </Route>
        
                {/* <Route path="job" element={<JobLayout />}>
                <Route index element={<JobHome />} />
                <Route path="list" element={<JobsList />} />
                <Route path="create" element={<CreateJob />} />
                <Route path=":jobId" element={<JobDetails />} />
                </Route> */}
        
                <Route path="expense" element={<ExpenseLayout />}>
                <Route index element={<ExpenseHome />} />
                <Route path="travel" element={<ExpenseTravelPlanList />} />
                <Route
                    path="travel/:travelPlanId"
                    element={<ExpenseTravelPlanDetails />}
                />
                <Route
                    path="travel/:travelPlanId/:employeeId/expenses"
                    element={<HExpenseList />}
                />
                <Route
                    path="travel/:travelPlanId/:employeeId/:expenseId/expenses/verify"
                    element={<VerifyExpense />}
                />
                </Route>
            </Route>
        
            <Route element={<ProtectedRoute allowedRoles={["ROLE_HR", "ROLE_EMPLOYEE"]} />}>
                <Route path="chart" element={<ChartLayout />}>
                <Route index element={<EmployeeList />} />
                <Route path=":id" element={<EmployeeChartPage />} />
                </Route>

                 <Route path="job" element={<JobLayout />}>
                <Route index element={<JobHome />} />
                <Route path="list" element={<JobsList />} />
                <Route path="create" element={<CreateJob />} />
                <Route path=":jobId" element={<JobDetails />} />
                </Route>
            </Route>
        
            <Route element={<ProtectedRoute allowedRoles={["ROLE_EMPLOYEE"]} />}>
                <Route path="Etravel" element={<EmployeeTravelLayout />}>
                <Route index element={<EmployeeTravelHome />} />
                <Route path="Elist" element={<EEmployeeTravelPlanList />} />
                <Route path="expense/:travelPlanId" element={<Expense />} />
                <Route path="Dlist" element={<DEmployeeTravelPlanList />} />
                <Route path="document/:travelPlanId" element={<Document />} />
                </Route>
            </Route>
        
            </Route>
        </Route>
        </Routes>
    );
}