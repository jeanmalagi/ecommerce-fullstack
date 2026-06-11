import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getOrderDetails,
} from "../services/orders";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  const [items, setItems] =
    useState([]);

  // ✅ Buscar pedido
  const loadOrder = async () => {
    try {
      const data =
        await getOrderDetails(id);

      setOrder(data.order);

      setItems(data.items);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  if (!order) {
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
          📦 Pedido #{order.id}
        </h1>

        {/* ✅ Infos */}
        <div style={summary}>
          <p>
            <strong>Status:</strong>{" "}
            {order.status}
          </p>

          <p>
            <strong>Total:</strong>{" "}
            R${" "}
            {Number(
              order.total
            ).toFixed(2)}
          </p>

          <p>
            <strong>Data:</strong>{" "}
            {new Date(
              order.created_at
            ).toLocaleDateString(
              "pt-BR"
            )}
          </p>
        </div>

        {/* ✅ Itens */}
        <div style={list}>
          {items.map((item) => (
            <div
              key={item.id}
              style={card}
            >
              <img
                src={
                  item.image_url
                    ? `http://localhost:3000${item.image_url}`
                    : "https://placehold.co/120x120"
                }
                alt={item.name}
                style={image}
              />

              <div style={info}>
                <h3>
                  {item.name}
                </h3>

                <p>
                  Quantidade:{" "}
                  {item.quantity}
                </p>

                <p>
                  Preço: R${" "}
                  {Number(
 2)}
                </p>

                <p>
                  Subtotal: R${" "}
                  {(
                    Number(
                      item.price
                    ) *
                    item.quantity
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
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
  marginBottom: "20px",
};

const summary = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "30px",
  display: "flex",
  gap: "30px",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const card = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "12px",
  display: "flex",
  gap: "20px",
};

const image = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "8px",
};

const info = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};