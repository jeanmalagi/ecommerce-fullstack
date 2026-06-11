import { api } from "./api";

//
// ✅ Token
//

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

//
// ✅ Buscar carrinho
//

export const getCart =
  async () => {
    const response =
      await api.get(
        "/cart",
        getAuthHeaders()
      );

    return response.data;
  };

//
// ✅ Adicionar item
//

export const addToCart =
  async (
    productId,
    quantity
  ) => {
    const response =
      await api.post(
        "/cart",
        {
          product_id: productId,
          quantity,
        },
        getAuthHeaders()
      );

    return response.data;
  };

//
// ✅ Atualizar quantidade
//

export const updateCartQuantity =
  async (
    cartItemId,
    quantity
  ) => {
    const response =
      await api.put(
        `/cart/${cartItemId}`,
        { quantity },
        getAuthHeaders()
      );

    return response.data;
  };

//
// ✅ Remover item
//

export const removeFromCart =
  async (cartItemId) => {
    const response =
      await api.delete(
        `/cart/${cartItemId}`,
        getAuthHeaders()
      );

    return response.data;
  };

//
// ✅ Checkout
//

export const checkout =
  async () => {
    const response =
      await api.post(
        "/orders",
        {},
        getAuthHeaders()
      );

    return response.data;
  };