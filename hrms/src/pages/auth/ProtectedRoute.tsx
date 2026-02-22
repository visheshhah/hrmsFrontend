import { Navigate, Outlet } from "react-router-dom"
import {jwtDecode} from "jwt-decode"

type Props = {
    //children: React.ReactNode;
    allowedRoles?: string[];
};

type TokenPayload = {
    roles: string[];
}


export default function ProtectedRoute({allowedRoles} : Props){
      const token = localStorage.getItem("token");

      if (!token) {
            return <Navigate to="/login" replace />;
        }
    
        if(allowedRoles){
              const decoded = jwtDecode<TokenPayload>(token);
              const hasRole = decoded.roles.some((role: string) => allowedRoles?.includes(role));
              if(!hasRole){
                    return <Navigate to="/login" replace />;
                }
        
            }
            return <Outlet/>
        }
        
        
        // export default function ProtectedRoute() {
        //   const token = localStorage.getItem("token");
        //   return token ? <Outlet /> : <Navigate to="/login" />;
        // }