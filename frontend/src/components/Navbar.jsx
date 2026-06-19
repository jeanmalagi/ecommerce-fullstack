import { Link } from "react-router-dom";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import { useCart } from "../contexts/CartContext";

import ConfirmLogoutModal from "./ConfirmLogoutModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [mobile, setMobile] =
    useState(
      window.innerWidth <= 768
    );

  const [showLogoutModal,
    setShowLogoutModal] =
    useState(false);

  const menuRef = useRef(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin =
    user?.is_admin;

  const userName =
    user?.name || "Usuário";

  const { cartCount } =
    useCart();

  // ✅ Detecta resize
  useEffect(() => {
    const handleResize = () => {
      setMobile(
        window.innerWidth <= 768
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  // ✅ Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <>
      <nav
        style={nav}
        ref={menuRef}
      >
        {/* ✅ Topbar */}
        <div style={topbar}>
          {/* ✅ Logo */}
          <Link
            to={
              isAdmin
                ? "/admin"
                : "/products"
            }
            style={logoLink}
          >
            <h2 style={logo}>
              🛒 MyStore
            </h2>
          </Link>

          {/* ✅ Hamburger */}
          {mobile && (
            <button
              style={menuBtn}
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
            >
              ☰
            </button>
          )}
        </div>

        {/* ✅ Links */}
        {(!mobile || menuOpen) && (
          <div
            style={{
              ...links,
              ...(mobile
                ? mobileLinks
                : {}),
            }}
          >
            {isAdmin ? (
              <>
                <Link
                  to="/admin"
                  style={link}
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin/products"
                  style={link}
                >
                  Produtos
                </Link>

                <Link
                  to="/admin/orders"
                  style={link}
                >
                  Pedidos
                </Link>

                <Link
                  to="/admin/stock"
                  style={link}
                >
                  Estoque
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/products"
                  style={link}
                >
                  Produtos
                </Link>

                <Link
                  to="/cart"
                  style={link}
                >
                  Carrinho (
                  {cartCount})
                </Link>

                <Link
                  to="/orders"
                  style={link}
                >
                  Meus Pedidos
                </Link>
              </>
            )}

            {/* ✅ Usuário */}
            <div style={userBadge}>
              👋 Olá, {userName}
            </div>

            {/* ✅ Logout */}
            <button
              style={logoutBtn}
              onClick={() =>
                setShowLogoutModal(
                  true
                )
              }
            >
              Sair
            </button>
          </div>
        )}
      </nav>

      {/* ✅ Modal Logout */}
      <ConfirmLogoutModal
        open={showLogoutModal}
        onCancel={() =>
          setShowLogoutModal(
            false
          )
        }
        onConfirm={() => {
          localStorage.clear();

          window.location.href =
            "/";
        }}
      />
    </>
  );
}

//
// ✅ STYLES
//

const nav = {
  backgroundColor: "#ee4d2d",
  color: "#fff",
  padding: "15px 20px",
  position: "sticky",
  top: 0,
  zIndex: 999,
};

const topbar = {
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
};

const logoLink = {
  textDecoration: "none",
};

const logo = {
  margin: 0,
  color: "#fff",
};

const menuBtn = {
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "30px",
  cursor: "pointer",
};

const links = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
  flexWrap: "wrap",
};

const mobileLinks = {
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: "20px",
};

const link = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};

const userBadge = {
  backgroundColor:
    "rgba(255,255,255,0.2)",
  padding: "8px 14px",
  borderRadius: "8px",
  fontWeight: "bold",
  color: "#fff",
};

const logoutBtn = {
  backgroundColor: "#fff",
  color: "#ee4d2d",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};