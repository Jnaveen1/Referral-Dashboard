import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("jwt_token");
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
    if(isAuthenticated === undefined){
        return <Navigate to="/login" replace />;
    }   
    return children ; 
};

export default ProtectedRoute;