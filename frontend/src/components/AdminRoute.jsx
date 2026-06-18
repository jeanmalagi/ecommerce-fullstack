import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const userString = localStorage.getItem("user");

  if (!userString) {
    return <Navigate to="/" replace />;
  }

  try {
    const user = JSON.parse(userString);

    if (!user.is_admin) {
      return <Navigate to="/products" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/" replace />;
  }
}