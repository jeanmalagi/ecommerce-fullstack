import { useEffect, useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../services/cart";

import { api } from "../services/api";

import { useCart } from "../contexts/CartContext";

import StockErrorModal from "../components/StockErrorModal";

import { toast } from "react-toastify";

export default function Products() {
  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [cartItems, setCartItems] =
    useState([]);

  const [showStockError,
    setShowStockError] =
    useState(false);

  const [stockMessage,
    setStockMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("");

  const [stockFilter,
    setStockFilter] =
    useState("all");

  const [categoryFilter,
    setCategoryFilter] =
    useState("all");

  const { refreshCart } =
    useCart();

  // ✅ Buscar produtos
  const loadProducts = async () => {
    try {
      const res = await api.get(
        "/products"
      );

      setProducts(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Buscar carrinho
  const loadCart = async () => {
    try {
      const data = await getCart();

      setCartItems(
        data.cart || []
      );

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();

    loadCart();
  }, []);

  // ✅ Buscar item carrinho
  const getCartItem = (
    productId
  ) => {
    return cartItems.find(
      (item) =>
        item.product_id ===
        productId
    );
  };

  // ✅ Filtrar produtos
  const filteredProducts =
    [...products]

      // ✅ Busca
      .filter((p) =>
        p.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )

      // ✅ Categoria
      .filter((p) => {
        if (
          categoryFilter ===
          "all"
        ) {
          return true;
        }

        return (
          p.category ===
          categoryFilter
        );
      })

      // ✅ Estoque
      .filter((p) => {
        if (
          stockFilter ===
          "available"
        ) {
          return p.stock > 0;
        }

        if (
          stockFilter === "out"
        ) {
          return p.stock <= 0;
        }

        return true;
      })

      // ✅ Ordenação
      .sort((a, b) => {
        if (
          sortBy ===
          "price-asc"
        ) {
          return a.price - b.price;
        }

        if (
          sortBy ===
          "price-desc"
        ) {
          return b.price - a.price;
        }

        if (sortBy === "name") {
          return a.name.localeCompare(
            b.name
          );
        }

        return 0;
      });

  // ✅ Adicionar carrinho
  const handleAddToCart =
    async (product) => {
      try {
        const existing =
          getCartItem(
            product.id
          );

        // ✅ Estoque máximo
        if (
          existing &&
          existing.quantity >=
            product.stock
        ) {
          setStockMessage(
            `Estoque máximo disponível para ${product.name}`
          );

          setShowStockError(true);

          toast.error(
            "Estoque insuficiente!"
          );

          return;
        }

        // ✅ Item já existe
        if (existing) {
          await updateCartQuantity(
            existing.id,
            existing.quantity +
              1
          );

        } else {
          await addToCart(
            product.id,
            1
          );
        }

        await loadCart();

        refreshCart();

        toast.success(
          "Produto adicionado!"
        );

      } catch (err) {
        console.error(err);

        if (
          err.response?.status ===
          400
        ) {
          setStockMessage(
            err.response.data.error
          );

          setShowStockError(true);

          toast.error(
            err.response.data.error
          );
        }
      }
    };

  // ✅ Diminuir quantidade
  const handleDecrease =
    async (productId) => {
      try {
        const existing =
          getCartItem(
            productId
          );

        if (!existing) return;

        // ✅ Remover
        if (
          existing.quantity <=
          1
        ) {
          await removeFromCart(
            existing.id
          );

          toast.success(
            "Produto removido!"
          );

        } else {
          await updateCartQuantity(
            existing.id,
            existing.quantity -
              1
          );
        }

        await loadCart();

        refreshCart();

      } catch (err) {
        console.error(err);
      }
    };

  return (
    <>
      <Navbar />

      <div style={page}>
        <h1 style={title}>
          🛍 Produtos
        </h1>

        {/* ✅ Filtros */}
        <div style={filters}>
          {/* ✅ Busca */}
          <input
            type="text"
            placeholder="🔎 Buscar produto..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={input}
          />

          {/* ✅ Categoria */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
            style={select}
          >
            <option value="all">
              Categorias
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

          {/* ✅ Ordenar */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            style={select}
          >
            <option value="">
              Ordenar
            </option>

            <option value="price-asc">
              Menor preço
            </option>

            <option value="price-desc">
              Maior preço
            </option>

            <option value="name">
              Nome A-Z
            </option>
          </select>

          {/* ✅ Estoque */}
          <select
            value={stockFilter}
            onChange={(e) =>
              setStockFilter(
                e.target.value
              )
            }
            style={select}
          >
            <option value="all">
              Todos
            </option>

            <option value="available">
              Disponíveis
            </option>

            <option value="out">
              Sem estoque
            </option>
          </select>
        </div>

        {/* ✅ Produtos */}
        <div style={grid}>
          {filteredProducts.map(
            (p) => {
              const cartItem =
                getCartItem(
                  p.id
                );

              return (
                <div
                  key={p.id}
                  style={card}
                >
                  {/* ✅ Área clicável */}
                  <div
                    style={clickArea}
                    onClick={() =>
                      navigate(
                        `/products/${p.id}`
                      )
                    }
                  >
                    {/* ✅ Imagem */}
                    <img
                      src={
                        p.image_url
                          ? `http://localhost:3000${p.image_url}`
                          : "https://placehold.co/300x200"
                      }
                      alt={p.name}
                      style={
                        productImage
                      }
                    />

                    {/* ✅   style={
                        categoryStyle
                      }
                    >
                      {
                        p.category
                      }
                    </p>

                    {/* ✅ Nome */}
                    <h3
                      style={
                        productName
                      }
                    >
                      {p.name}
                    </h3>

                    {/* ✅ Descrição */}
                    <p
                      style={
                        description
                      }
                    >
                      {
                        p.description
                      }
                    </p>

                    {/* ✅ Preço */}
                    <p
                      style={price}
                    >
                      R${" "}
                      {Number(
                        p.price
                      ).toFixed(
                        2
                      )}
                    </p>

                    {/* ✅ Estoque */}
                    <p
                      style={stock}
                    >
                      Estoque:{" "}
                      {p.stock}
                    </p>
                  </div>

                  {/* ✅ Sem estoque */}
                  {p.stock <= 0 ? (
                    <button
                      disabled
                      style={
                        disabledBtn
                      }
                    >
                      Sem estoque
                    </button>
                  ) : (
                    <>
                      {/* ✅ Quantidade */}
                      {cartItem && (
                        <div
                          style={
                            quantityArea
                          }
                        >
                          <button
                            style={
                              quantityBtn
                            }
                            onClick={() =>
                              handleDecrease(
                                p.id
                              )
                            }
                          >
                            -
                          </button>

                          <span>
                            {
                              cartItem.quantity
                            }
                          </span>

                          <button
                            style={
                              quantityBtn
                            }
                            onClick={() =>
                              handleAddToCart(
                                p
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      )}

                      {/* ✅ Adicionar */}
                      <button
                        style={
                          button
                        }
                        onClick={() =>
                          handleAddToCart(
                            p
                          )
                        }
                      >
                        🛒 Adicionar
                      </button>
                    </>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* ✅ Modal estoque */}
      <StockErrorModal
        open={
          showStockError
        }
        message={
          stockMessage
        }
        onClose={() =>
          setShowStockError(
            false
          )
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
  maxWidth: "1400px",
  margin: "0 auto",
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
};

const title = {
  marginBottom: "30px",
};

const filters = {
  display: "flex",
  gap: "15px",
  marginBottom: "25px",
  flexWrap: "wrap",
};

const input = {
  flex: 1,
  minWidth: "220px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const select = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fill, 260px)",
  gap: "20px",
  justifyContent: "flex-start",
};

const card = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "15px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
  width: "260px",
  display: "flex",
  flexDirection: "column",
};

const clickArea = {
  cursor: "pointer",
};

const productImage = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "12px",
};

const categoryStyle = {
  backgroundColor: "#f1f1f1",
  padding: "6px 10px",
  borderRadius: "6px",
  fontSize: "12px",
  width: "fit-content",
  marginBottom: "10px",
};

const productName = {
  marginBottom: "8px",
};

const description = {
  color: "#666",
  fontSize: "14px",
  marginBottom: "12px",
};

const price = {
  color: "#ee4d2d",
  fontWeight: "bold",
  fontSize: "18px",
};

const stock = {
  marginTop: "8px",
  marginBottom: "15px",
  color: "#666",
  fontSize: "14px",
};

const button = {
  width: "100%",
  backgroundColor: "#ee4d2d",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const disabledBtn = {
  width: "100%",
  backgroundColor: "#ccc",
  color: "#666",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "not-allowed",
  fontWeight: "bold",
};

const quantityArea = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  marginBottom: "15px",
};

const quantityBtn = {
  width: "35px",
  height: "35px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#ee4d2d",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};