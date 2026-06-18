import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import {
  getCart,
  updateCartQuantity,
  removeFromCart,
  checkout,
} from "../services/cart";

import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

import ConfirmOrderModal from "../components/ConfirmOrderModal";
import ConfirmClearCartModal from "../components/ConfirmClearCartModal";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const { refreshCart } = useCart();

  // ✅ Buscar carrinho
  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data.cart || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ✅ Atualizar quantidade
  const handleUpdateQuantity = async (id, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(id);
        toast.success("Produto removido!");
      } else {
        await updateCartQuantity(id, quantity);
      }

      await loadCart();
      refreshCart();

    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar carrinho");
    }
  };

  // ✅ NOVO: Limpar carrinho
  const handleClearCart = async () => {
    try {
      for (const item of cart) {
        await removeFromCart(item.id);
      }

      toast.success("Carrinho limpo com sucesso!");

      await loadCart();
      refreshCart();

    } catch (err) {
      console.error(err);
      toast.error("Erro ao limpar carrinho");
    }
  };

  // ✅ Checkout
  const handleCheckout = async () => {
    try {
      await checkout();

      toast.success("Pedido realizado com sucesso!");

      setCart([]);
      refreshCart();

    } catch (err) {
      console.error(err);
      toast.error("Erro ao finalizar pedido");
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={page}>Carregando...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={page}>
        <h1 style={title}>🛒 Meu Carrinho</h1>

        {cart.length === 0 ? (
          <div style={empty}>
            Seu carrinho está vazio
          </div>
        ) : (
          <>
            {/* ✅ BOTÃO LIMPAR */}
            <div style={{ marginBottom: "20px" }}>
              <button
                data-testid="clear-cart"
                onClick={() => setShowClearModal(true)}
                style={clearCartBtn}
              >
                🗑 Limpar Carrinho
              </button>
            </div>

            {/* ✅ Lista */}
            <div style={list}>
              {cart.map((item) => (
                <div key={item.id} style={card}>
                  <img
                    src={
                      item.image_url
                        ? `http://localhost:3000${item.image_url}`
                        : "https://placehold.co/100x100"
                    }
                    alt={item.name}
                    style={image}
                  />

                  <div style={info}>
                    <h3>{item.name}</h3>
                    <p>R$ {Number(item.price).toFixed(2)}</p>
                  </div>

                  <div style={quantityArea}>
                    <button
                      style={quantityBtn}
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      style={quantityBtn}
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <strong>
                      R${" "}
                      {(Number(item.price) * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Resumo */}
            <div style={summary}>
              <h2>Total: R$ {total.toFixed(2)}</h2>

              <button
                style={checkoutBtn}
                onClick={() => setShowConfirmModal(true)}
              >
                ✅ Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>

      <ConfirmOrderModal
        open={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={async () => {
          setShowConfirmModal(false);
          await handleCheckout();
        }}
      />

      <ConfirmClearCartModal
        open={showClearModal}
        onCancel={() => setShowClearModal(false)}
        onConfirm={async () => {
          setShowClearModal(false);
          await handleClearCart();
        }}
      />
    </>
  );
}


// ✅ STYLES
const page = { padding: "30px", backgroundColor: "#f5f5f5", minHeight: "100vh" };
const title = { marginBottom: "30px" };
const empty = { backgroundColor: "#fff", padding: "30px", borderRadius: "12px", textAlign: "center", color: "#666" };
const list = { display: "flex", flexDirection: "column", gap: "20px" };
const card = { backgroundColor: "#fff", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" };
const image = { width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" };
const info = { flex: 1 };
const quantityArea = { display: "flex", alignItems: "center", gap: "10px" };
const quantityBtn = { width: "35px", height: "35px", border: "none", borderRadius: "6px", backgroundColor: "#ee4d2d", color: "#fff", cursor: "pointer", fontWeight: "bold" };
const summary = { marginTop: "30px", backgroundColor: "#fff", padding: "25px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" };
const checkoutBtn = { backgroundColor: "#28a745", color: "#fff", border: "none", padding: "14px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };

// ✅ NOVO STYLE
const clearCartBtn = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};