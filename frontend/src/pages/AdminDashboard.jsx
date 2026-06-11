import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getDashboard,
} from "../services/dashboard";

export default function Admin() {
  const navigate =
    useNavigate();

  const [dashboard, setDashboard] =
    useState(null);

  // ✅ Buscar dashboard
  const loadDashboard =
    async () => {
      try {
        const data =
          await getDashboard();

        setDashboard(data);

      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!dashboard) {
    return (
      <>
        <Navbar />

        <div style={page}>
          Carregando...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={page}>
        <h1 style={title}>
          📊 Dashboard Admin
        </h1>

        {/* ✅ Métricas */}
        <div style={metricsGrid}>
          <div style={metricCard}>
            <h2>
              💰 R${" "}
              {Number(
                dashboard.totalSales
              ).toFixed(2)}
            </h2>

            <p>
              Faturamento
            </p>
          </div>

          <div style={metricCard}>
            <h2>
              📦{" "}
              {
                dashboard.totalOrders
              }
            </h2>

            <p>
              Pedidos
            </p>
          </div>

          <div style={metricCard}>
            <h2>
              👤{" "}
              {
                dashboard.totalUsers
              }
            </h2>

            <p>
              Clientes
            </p>
          </div>

          <div style={metricCard}>
            <h2>
              📉{" "}
              {dashboard.lowStock}
            </h2>

            <p>
              Estoque Crítico
            </p>
          </div>
        </div>

        {/* ✅ Navegação */}
        <div style={grid}>
          <div
            style={card}
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
          >
            <h2>
              📦 Produtos
            </h2>

            <p>
              Gerenciar produtos
            </p>
          </div>

          <div
            style={card}
            onClick={() =>
              navigate(
                "/admin/orders"
              )
            }
          >
            <h2>
              🛒 Pedidos
            </h2>

            <p>
              Gerenciar pedidos
            </p>
          </div>

          <div
            style={card}
            onClick={() =>
              navigate(
                "/admin/stock"
              )
            }
          >
            <h2>
              📉 Estoque
            </h2>

            <p>
              Controle estoque
            </p>
          </div>
        </div>

        {/* ✅ Pedidos recentes */}
        <div style={section}>
          <h2>
            📦 Pedidos Recentes
          </h2>

          <div style={list}>
            {dashboard.recentOrders.map(
              (order) => (
                <div
                  key={order.id}
                  style={listCard}
                >
                  <div>
                    <strong>
                      Pedido #
                      {order.id}
                    </strong>

                    <p>
                      {
                        order.user_name
                      }
                    </p>
                  </div>

                  <div>
                    <strong>
                      R${" "}
                      {Number(
                        order.total
                      ).toFixed(2)}
                    </strong>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* ✅ Estoque crítico */}
        <div style={section}>
          <h2>
            ⚠️ Estoque Crítico
          </h2>

          <div style={list}>
            {dashboard.criticalProducts.map(
              (product) => (
                <div
                  key={product.id}
                  style={listCard}
                >
                  <strong>
                    {product.name}
                  </strong>

                  <span
                    style={
                      criticalBadge
                    }
                  >
                    {product.stock}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

//
// ✅ STYLES
//

const page = {
  padding: "30px",
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
};

const title = {
  marginBottom: "30px",
};

const metricsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const metricCard = {
  backgroundColor: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const card = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "30px",
  cursor: "pointer",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
};

const section = {
  marginTop: "40px",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
};

const listCard = {
  backgroundColor: "#fff",
  padding: "18px",
  borderRadius: "10px",
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
};

const criticalBadge = {
  backgroundColor: "#dc3545",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "8px",
  fontWeight: "bold",
};