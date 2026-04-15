import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./MyContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const context = useContext(AuthContext);
  
  if (!context) {
    return <Navigate to="/login" />;
  }
  
  const { user } = context;
  
  return user ? children : <Navigate to="/login" />;
};