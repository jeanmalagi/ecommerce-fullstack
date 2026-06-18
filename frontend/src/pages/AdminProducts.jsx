import { useEffect, useState } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // ✅ Buscar produtos
  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ Abrir modal exclusão
  const handleOpenDelete = (id) => {
    setSelectedProductId(id);
    setShowDeleteModal(true);
  };

  // ✅ Confirmar exclusão
  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      await api.delete(`/products/${selectedProductId}`);

      // ✅ Remove da lista (sem reload)
      setProducts((prev) => prev.filter((p) => p.id !== selectedProductId));

      // ✅ Feedback
      toast.success("Produto excluído com sucesso!");

      // ✅ Fecha modal
      setShowDeleteModal(false);

    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir produto");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={page}>
        <div style={header}>
          <h1>📦 Gerenciar Produtos</h1>

          <button
            style={newBtn}
            onClick={() => (window.location.href = "/admin/products/new")}
          >
            + Novo Produto
          </button>
        </div>

        {/* ✅ Grid produtos */}
        <div style={grid}>
          {products.map((p) => (
            <div key={p.id} style={card}>

              {/* ✅ Imagem */}
              <img
                src={
                  p.image_url
                    ? `http://localhost:3000${p.image_url}`
                    : "https://placehold.co/300x300"
                }
                alt={p.name}
                style={image}
              />

              {/* ✅ Nome */}
              <h3 style={name}>{p.name}</h3>

              {/* ✅ Preço */}
              <p style={price}>R$ {Number(p.price).toFixed(2)}</p>

              {/* ✅ Estoque */}
              <p style={stock}>Estoque: {p.stock}</p>

              {/* ✅ Botões */}
              <div style={actions}>
                <button
                  style={editBtn}
                  onClick={() =>
                    (window.location.href = `/admin/products/edit/${p.id}`)
                  }
                >
                  ✏️ Editar
                </button>

                <button
                  style={deleteBtn}
                  onClick={() => handleOpenDelete(p.id)}
                >
                  🗑 Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Modal exclusão */}
      <ConfirmModal
        open={showDeleteModal}
        icon="🗑️"
        title="Excluir produto"
        message="Deseja realmente excluir este produto?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        loading={loadingDelete} // ✅ opcional se quiser mostrar loader
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

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const newBtn = {
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
};

const card = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
};

const image = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
};

const name = {
  padding: "15px 15px 5px",
  minHeight: "60px",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const price = {
  padding: "0 15px",
  color: "#ee4d2d",
  fontWeight: "bold",
};

const stock = {
  padding: "0 15px",
  color: "#666",
  marginTop: "5px",
};

const actions = {
  display: "flex",
  gap: "10px",
  padding: "15px",
  marginTop: "auto",
};

const editBtn = {
  flex: 1,
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const deleteBtn = {
  flex: 1,
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};