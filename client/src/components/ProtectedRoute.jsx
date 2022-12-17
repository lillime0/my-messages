import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/messageContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  return user ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
