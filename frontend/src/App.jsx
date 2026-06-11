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
        element={<Cart />}
      />

      {/* ✅ Pedidos */}
      <Route
        path="/orders"
        element={<Orders />}
      />

      {/* ✅ Admin */}
      <Route
        path="/admin"
        element={<Admin />}
      />

      {/* ✅ Admin produtos */}
      <Route
        path="/admin/products"
        element={<AdminProducts />}
      />

      {/* ✅ Criar produto */}
      <Route
        path="/admin/products/new"
        element={<CreateProduct />}
      />

      {/* ✅ Editar produto */}
      <Route
        path="/admin/products/edit/:id"
        element={<EditProduct />}
      />

      <Route
        path="/orders/:id"
        element={<OrderDetails />}
      />
      <Route
        path="/admin/orders"
        element={<AdminOrders />}
      />
      <Route
        path="/admin/stock"
        element={<AdminStock />}
      />
      <Route
        path="/products/:id"
        element={<ProductDetails />}
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