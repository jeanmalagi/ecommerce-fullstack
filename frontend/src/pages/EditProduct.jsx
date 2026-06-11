import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import { api } from "../services/api";

import { toast } from "react-toastify";

import {
  formatPrice,
  parsePrice,
} from "../utils/formatPrice";

export default function EditProduct() {
  const navigate =
    useNavigate();

  const { id } = useParams();

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

  const [
    currentImage,
    setCurrentImage,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  // ✅ Buscar produto
  const loadProduct =
    async () => {
      try {
        const response =
          await api.get(
            `/products/${id}`
          );

        const product =
          response.data;

        setName(product.name);

        setDescription(
          product.description
        );

        setPrice(
          formatPrice(
            String(
              product.price
            ).replace(".", "")
          )
        );

        setStock(product.stock);

        setCategory(
          product.category || ""
        );

        setCurrentImage(
          product.image_url
        );

      } catch (err) {
        console.error(err);

        toast.error(
          "Erro ao carregar produto"
        );
      }
    };

  useEffect(() => {
    loadProduct();
  }, []);

  // ✅ Salvar alterações
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

        await api.put(
          `/products/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Produto atualizado!"
        );

        navigate(
          "/admin/products"
        );

      } catch (err) {
        console.error(err);

        toast.error(
          "Erro ao atualizar produto"
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
            ✏️ Editar Produto
          </h1>

          <form
            onSubmit={
              handleSubmit
            }
            style={form}
          >
            {/* ✅ Nome */}
            <div>
              <label style={label}>
                Nome do Produto
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                required
                style={input}
              />
            </div>

            {/* ✅ Descrição */}
            <div>
              <label style={label}>
                Descrição
              </label>

              <textarea
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                required
                style={textarea}
              />
            </div>

            {/* ✅ Preço */}
            <div>
              <label style={label}>
                Preço
              </label>

              <input
                type="text"
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
            </div>

            {/* ✅ Estoque */}
            <div>
              <label style={label}>
                Estoque
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) =>
                  setStock(
                    e.target.value
                  )
                }
                required
                style={input}
              />
            </div>

            {/* ✅ Categoria */}
            <div>
              <label style={label}>
                Categoria
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                required
                style={selectStyle}
              >
                <option value="">
                  Selecione
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
            </div>

            {/* ✅ Imagem atual */}
            {currentImage && (
              <div>
                <label style={label}>
                  Imagem Atual
                </label>

                <img
                  src={`http://localhost:3000${currentImage}`}
                  alt={name}
                  style={imagePreview}
                />
              </div>
            )}

            {/* ✅ Nova imagem */}
            <div>
              <label style={label}>
                Alterar Imagem
              </label>

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
            </div>

            {/* ✅ Botão */}
            <button
              type="submit"
              style={button}
              disabled={loading}
            >
              {loading
                ? "Salvando..."
                : "Salvar Alterações"}
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
};

const card = {
  width: "100%",
  maxWidth: "700px",
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
  gap: "20px",
};

const label = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  height: "50px",
  boxSizing: "border-box",
};

const selectStyle = {
  width: "100%",
  height: "50px",
  padding: "0 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
  backgroundColor: "#fff",
};

const textarea = {
  width: "100%",
  minHeight: "140px",
  resize: "vertical",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const imagePreview = {
  width: "100%",
  maxHeight: "300px",
  objectFit: "cover",
  borderRadius: "10px",
  marginTop: "10px",
};

const button = {
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  padding: "14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};