import { Navigate } from "react-router-dom";

export default function StoreRoute({ children }) {
  const userString = localStorage.getItem("user");

  if (!userString) {
    return children;
  }

  try {
    const user = JSON.parse(userString);

    if (user?.is_admin) {
      return <Navigate to="/admin" replace />;
    }

    return children;
  } catch {
    return children;
  }
}
