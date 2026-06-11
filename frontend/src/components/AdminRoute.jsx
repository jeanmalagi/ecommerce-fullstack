import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Não logado
  if (!user) {
    return <Navigate to="/" />;
  }

  // ✅ Não é admin
  if (!user.is_admin) {
    return <Navigate to="/products" />;
  }

  return children;
}
