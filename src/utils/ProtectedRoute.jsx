import { Navigate } from "react-router-dom";
import { toastError, toastInfo } from "./toasts";

export function ProtectedRoute({ children }) {
  const headerData = JSON.parse(localStorage.getItem("headerData"));
  if (!headerData) {
    toastError("Please login");
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}

export function LoggedInRoute({ children }) {
  const loginData = JSON.parse(localStorage.getItem("LoginData"));
  if (loginData) {
    toastInfo("You are already logged in");
    return <Navigate to="/app" replace={true} />;
  }
  return <>{children}</>;
}
