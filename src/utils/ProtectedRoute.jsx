import { Navigate } from "react-router-dom";
import { toastError } from "./toasts";

export function ProtectedRoute({ children }) {
  const headerData = JSON.parse(localStorage.getItem("headerData"));
  if (!headerData) {
    toastError("Please login");
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}
