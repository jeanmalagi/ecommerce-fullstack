import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getOrders } from "../services/orders";

export default function Orders() {
  const [orders, setOrders] =
    useState([]);

  const navigate =
    useNavigate();

  // ✅ Buscar pedidos
  const loadOrders = async () => {
    try {
      const data =
        await getOrders();

      setOrders(data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ✅ Label status
  const getStatusLabel = (
    status
  ) => {
    switch (status) {
      case "pending":
        return "⏳ Pendente";

      case "paid":
        return "💳 Pago";

      case "shipped":
        return "🚚 Enviado";

      case "delivered":
        return "✅ Entregue";

      default:
        return status;
    }
  };

  // ✅ Cor status
  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "pending":
        return "#ffc107";

      case "paid":
        return "#17a2b8";

      case "shipped":
        return "#007bff";

      case "delivered":
        return "#28a745";

      default:
        return "#6c757d";
    }
  };

  return (
    <>
      <Navbar />

      <div style={page}>
        <h1 style={title}>
          📦 Meus Pedidos
        </h1>

        {orders.length === 0 ? (
          <div style={empty}>
            Você ainda não possui
            pedidos
          </div>
        ) : (
          <div style={list}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={card}
              >
                {/* ✅ Infos */}
                <div style={left}>
                  <h2 style={orderTitle}>
                    Pedido #
                    {order.id}
                  </h2>

                  <p>
                    <strong>
                      Total:
                    </strong>{" "}
                    R${" "}
                    {Number(
                      order.total
                    ).toFixed(2)}
                  </p>

                  <p>
                    <strong>
                      Data:
                    </strong>{" "}
                    {new Date(
                      order.created_at
                    ).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>

                {/* ✅ Actions */}
                <div style={right}>
                  <span
                    style={{
                      ...status,
                      backgroundColor:
                        getStatusColor(
                          order.status
                        ),
                    }}
                  >
                    {getStatusLabel(
                      order.status
                    )}
                  </span>

                  <button
                    style={detailsBtn}
                    onClick={() =>
                      navigate(
                        `/orders/${order.id}`
                      )
                    }
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

const empty = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  color: "#666",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const card = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "22px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const left = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const orderTitle = {
  margin: 0,
};

const status = {
  color: "#fff",
  padding: "10px 14px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "bold",
};

const detailsBtn = {
  backgroundColor: "#ee4d2d",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};