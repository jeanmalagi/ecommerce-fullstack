import { api } from "./api";

//
// ✅ Criar pedido
//

export const createOrder = async () => {
  const response = await api.post("/orders");

  return response.data;
};

//
// ✅ Buscar pedidos
//

export const getOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};
//
// ✅ Detalhes pedido
//

export const getOrderDetails =
  async (id) => {
    const response =
      await api.get(
        `/orders/${id}`
      );

    return response.data;
  };//
// ✅ Admin pedidos
//

export const getAllOrders =
  async () => {
    const response =
      await api.get(
        "/orders/admin/all"
      );

    return response.data;
  };

//
// ✅ Atualizar status
//

export const updateOrderStatus =
  async (id, status) => {
    const response =
      await api.put(
        `/orders/admin/${id}`,
        {
          status,
        }
      );

    return response.data;
  };