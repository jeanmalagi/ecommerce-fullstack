import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getProduct,
} from "../services/products";

import {
  addToCart,
} from "../services/cart";

import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  // ✅ Buscar produto
  const loadProduct =
    async () => {
      try {
        const data =
          await getProduct(id);

        setProduct(data);

      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    loadProduct();
  }, []);

  // ✅ Adicionar carrinho
  const handleAddToCart =
    async () => {
      try {
        await addToCart(
          product.id,
          quantity
        );

        toast.success(
          "Produto adicionado!"
        );

      } catch (err) {
        console.error(err);

        toast.error(
          "Erro ao adicionar"
        );
      }
    };

  if (!product) {
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
        <div style={container}>
          {/* ✅ Imagem */}
          <div style={imageArea}>
            <img
              src={product.image}
              alt={product.name}
              style={image}
            />
          </div>

          {/* ✅ Infos */}
          <div style={info}>
            <span style={category}>
              {product.category}
            </span>

            <h1 style={title}>
              {product.name}
            </h1>

            <p style={description}>
              {
                product.description
              }
            </p>

            <h2 style={price}>
              R${" "}
              {Number(
                product.price
              ).toFixed(2)}
            </h2>

            <p style={stock}>
              Estoque disponível:{" "}
              {product.stock}
            </p>

            {/* ✅ Quantidade */}
            <div style={quantityArea}>
              <button
                style={quantityBtn}
                onClick={() =>
                  setQuantity(
                    Math.max(
                      1,
                      quantity - 1
                    )
                  )
                }
              >
                -
              </button>

              <span style={quantityText}>
                {quantity}
              </span>

              <button
                style={quantityBtn}
                onClick={() =>
                  setQuantity(
                    Math.min(
                      product.stock,
                      quantity + 1
                    )
                  )
                }
              >
                +
              </button>
            </div>

            {/* ✅ Botão */}
            <button
              style={button}
              onClick={
                handleAddToCart
              }
            >
              🛒 Adicionar ao Carrinho
            </button>
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
  padding: "40px",
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  backgroundColor: "#fff",
  borderRadius: "14px",
  padding: "30px",
  display: "grid",
  gridTemplateColumns:
    "1fr 1fr",
  gap: "40px",
};

const imageArea = {
  width: "100%",
};

const image = {
  width: "100%",
  borderRadius: "12px",
  objectFit: "cover",
};

const info = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const category = {
  backgroundColor: "#f1f1f1",
  width: "fit-content",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "14px",
};

const title = {
  margin: 0,
};

const description = {
  color: "#666",
  lineHeight: 1.6,
};

const price = {
  color: "#ee4d2d",
  fontSize: "32px",
  margin: 0,
};

const stock = {
  color: "#666",
};

const quantityArea = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const quantityBtn = {
  width: "40px",
  height: "40px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#ee4d2d",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

const quantityText = {
  fontSize: "20px",
  fontWeight: "bold",
};

const button = {
  backgroundColor: "#ee4d2d",
  color: "#fff",
  border: "none",
  padding: "16px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};