import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/messageContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  return user ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
