import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import { api } from "../services/api";

export default function AdminStock() {
  const [products, setProducts] =
    useState([]);

  // ✅ Buscar produtos
  const loadProducts = async () => {
    try {
      const response =
        await api.get(
          "/products"
        );

      setProducts(
        response.data
      );

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ Atualizar estoque
  const updateStock = async (
    product,
    change
  ) => {
    try {
      const newStock =
        product.stock + change;

      // ✅ Não deixa negativo
      if (newStock < 0) {
        return;
      }

      await api.put(
        `/products/${product.id}`,
        {
          ...product,
          stock: newStock,
        }
      );

      // ✅ Atualiza realtime
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                stock: newStock,
              }
            : p
        )
      );

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div style={page}>
        <h1 style={title}>
          📉 Controle Estoque
        </h1>

        <div style={list}>
          {products.map((p) => (
            <div
              key={p.id}
              style={card}
            >
              {/* ✅ Produto */}
              <div style={info}>
                <h3>{p.name}</h3>

                <p>
                  R${" "}
                  {Number(
                    p.price
                  ).toFixed(2)}
                </p>
              </div>

              {/* ✅ Controle */}
              <div style={right}>
                {/* ✅ Badge */}
                <span
                  style={{
                    ...stockBadge,
                    backgroundColor:
                      p.stock <= 5
                        ? "#dc3545"
                        : p.stock <= 10
                        ? "#ffc107"
                        : "#28a745",
                  }}
                >
                  Estoque: {p.stock}
                </span>

                {/* ✅ Controls */}
                <div style={controls}>
                  <button
                    style={minusBtn}
                    onClick={() =>
                      updateStock(
                        p,
                        -1
                      )
                    }
                  >
                    -
                  </button>

                  <span style={quantity}>
                    {p.stock}
                  </span>

                  <button
                    style={plusBtn}
                    onClick={() =>
                      updateStock(
                        p,
                        1
                      )
                    }
                  >
                    +
                  </button>
                </div>
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
  marginBottom: "30px",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const card = {
  backgroundColor: "#fff",
  padding: "20px",
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
  gap: "6px",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const stockBadge = {
  color: "#fff",
  padding: "10px 14px",
  borderRadius: "8px",
  fontWeight: "bold",
};

const controls = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const quantity = {
  fontWeight: "bold",
  fontSize: "18px",
  minWidth: "30px",
  textAlign: "center",
};

const minusBtn = {
  width: "35px",
  height: "35px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#dc3545",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "18px",
};

const plusBtn = {
  width: "35px",
  height: "35px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#28a745",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "18px",
};