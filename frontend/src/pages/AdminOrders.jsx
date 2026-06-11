import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import {
  getAllOrders,
  updateOrderStatus,
} from "../services/orders";

import ConfirmStatusModal from "../components/ConfirmStatusModal";

import { toast }
  from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] =
    useState([]);

  const [showModal,
    setShowModal] =
    useState(false);

  const [selectedOrder,
    setSelectedOrder] =
    useState(null);

  const [selectedStatus,
    setSelectedStatus] =
    useState("");

  // ✅ Buscar pedidos
  const loadOrders = async () => {
    try {
      const data =
        await getAllOrders();

      setOrders(data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ✅ Abrir modal
  const openStatusModal = (
    order,
    status
  ) => {
    setSelectedOrder(order);

    setSelectedStatus(status);

    setShowModal(true);
  };

  // ✅ Confirmar alteração
  const handleStatusChange =
    async () => {
      try {
        await updateOrderStatus(
          selectedOrder.id,
          selectedStatus
        );

        await loadOrders();

        toast.success(
            "Status atualizado!"
        );
        
        setShowModal(false);

      } catch (err) {
        console.error(err);
      }
    };

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

      case "cancelled":
        return "❌ Cancelado";

      default:
        return status;
    }
  };

  return (
    <>
      <Navbar />

      <div style={page}>
        <h1 style={title}>
          📦 Pedidos
        </h1>

        <div style={list}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={card}
            >
              {/* ✅ Infos */}
              <div style={info}>
                <h2>
                  Pedido #
                  {order.id}
                </h2>

                <p>
                  <strong>
                    Cliente:
                  </strong>{" "}
                  {order.user_name}
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>{" "}
                  {order.email}
                </p>

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

              {/* ✅ Status */}
              <div style={statusArea}>
                <span style={currentStatus}>
                  {getStatusLabel(
                    order.status
                  )}
                </span>

                <select
                  value={
                    order.status
                  }
                  style={select}
                  onChange={(e) =>
                    openStatusModal(
                      order,
                      e.target.value
                    )
                  }
                >
                  <option value="pending">
                    ⏳ Pendente
                  </option>

                  <option value="paid">
                    💳 Pago
                  </option>

                  <option value="shipped">
                    🚚 Enviado
                  </option>

                  <option value="delivered">
                    ✅ Entregue
                  </option>

                  <option value="cancelled">
                    ❌ Cancelado
                  </option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Modal confirmação */}
      <ConfirmStatusModal
        open={showModal}
        status={getStatusLabel(
          selectedStatus
        )}
        onCancel={() =>
          setShowModal(false)
        }
        onConfirm={
          handleStatusChange
        }
      />
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

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const card = {
  backgroundColor: "#fff",
  padding: "25px",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
};

const info = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const statusArea = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "flex-end",
};

const currentStatus = {
  backgroundColor: "#ee4d2d",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "14px",
};

const select = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontWeight: "bold",
  cursor: "pointer",
};