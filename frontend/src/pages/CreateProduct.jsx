import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { api } from "../services/api";

import { toast } from "react-toastify";

import {
  formatPrice,
  parsePrice,
} from "../utils/formatPrice"

export default function CreateProduct() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // ✅ Criar produto
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "name",
          name
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "price",
          parsePrice(price)
        );

        formData.append(
          "stock",
          stock
        );

        formData.append(
          "category",
          category
        );

        if (image) {
          formData.append(
            "image",
            image
          );
        }

        await api.post(
          "/products",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Produto criado!"
        );

        navigate(
          "/admin/products"
        );

      } catch (err) {
        console.error(err);

        toast.error(
          "Erro ao criar produto"
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <Navbar />

      <div style={page}>
        <div style={card}>
          <h1 style={title}>
            📦 Novo Produto
          </h1>

          <form
            onSubmit={
              handleSubmit
            }
            style={form}
          >
            {/* ✅ Nome */}
            <input
              type="text"
              placeholder="Nome do produto"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
              style={input}
            />

            {/* ✅ Descrição */}
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              required
              style={textarea}
            />

            {/* ✅ Preço */}
            
            <input
              type="text"
              placeholder="Preço"
              value={price}
              onChange={(e) =>
                setPrice(
                  formatPrice(
                    e.target.value
                  )
                )
              }
              required
              style={input}
            />

            {/* ✅ Estoque */}
            <input
              type="number"
              placeholder="Estoque"
              value={stock}
              onChange={(e) =>
                setStock(
                  e.target.value
                )
              }
              required
              style={input}
            />

            {/* ✅ Categoria */}
            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              required
              style={input}
            >
              <option value="">
                Categoria
              </option>

              <option value="Games">
                Games
              </option>

              <option value="Informática">
                Informática
              </option>

              <option value="Casa">
                Casa
              </option>

              <option value="Moda">
                Moda
              </option>
            </select>

            {/* ✅ Imagem */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target.files[0]
                )
              }
              style={input}
            />

            {/* ✅ Botão */}
            <button
              type="submit"
              style={button}
              disabled={loading}
            >
              {loading
                ? "Salvando..."
                : "Criar Produto"}
            </button>
          </form>
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
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
};

const card = {
  width: "100%",
  maxWidth: "600px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "30px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
};

const title = {
  marginBottom: "25px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const textarea = {
  minHeight: "120px",
  resize: "vertical",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const button = {
  backgroundColor: "#ee4d2d",
  color: "#fff",
  border: "none",
  padding: "14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};