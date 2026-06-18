import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";

import Products from "./pages/Products";

import Cart from "./pages/Cart";

import Orders from "./pages/Orders";

import Admin from "./pages/AdminDashboard";

import AdminProducts from "./pages/AdminProducts";

import CreateProduct from "./pages/CreateProduct";

import EditProduct from "./pages/EditProduct";

import OrderDetails
  from "./pages/OrderDetails";

import AdminOrders
  from "./pages/AdminOrders";

import AdminStock
  from "./pages/AdminStock";
  
import ProductDetails
  from "./pages/ProductDetails";

import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./PrivateRoute";  

function App() {
  return (
    <Routes>
      {/* ✅ Login */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* ✅ Produtos */}
      <Route
        path="/products"
        element={<Products />}
      />

      {/* ✅ Carrinho */}
      <Route
        path="/cart"
        element={<PrivateRoute><Cart /></PrivateRoute>}
      />

      {/* ✅ Pedidos */}
      <Route
        path="/orders"
        element={<PrivateRoute><Orders /></PrivateRoute>}
      />

      {/* ✅ Detalhes do Pedido */}
      <Route
        path="/orders/:id"
        element={<PrivateRoute><OrderDetails /></PrivateRoute>}
      />

      {/* ✅ Detalhes do Produto */}
      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      {/* ✅ Admin - Dashboard */}
      <Route
        path="/admin"
        element={<AdminRoute><Admin /></AdminRoute>}
      />

      {/* ✅ Admin - Produtos */}
      <Route
        path="/admin/products"
        element={<AdminRoute><AdminProducts /></AdminRoute>}
      />

      {/* ✅ Admin - Criar produto */}
      <Route
        path="/admin/products/new"
        element={<AdminRoute><CreateProduct /></AdminRoute>}
      />

      {/* ✅ Admin - Editar produto */}
      <Route
        path="/admin/products/edit/:id"
        element={<AdminRoute><EditProduct /></AdminRoute>}
      />

      {/* ✅ Admin - Pedidos */}
      <Route
        path="/admin/orders"
        element={<AdminRoute><AdminOrders /></AdminRoute>}
      />

      {/* ✅ Admin - Estoque */}
      <Route
        path="/admin/stock"
        element={<AdminRoute><AdminStock /></AdminRoute>}
      />
      {/* ✅ Redirect fallback */}
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;