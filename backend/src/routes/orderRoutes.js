import express from "express";

const router = express.Router();

import {
  createOrder,
  getOrders,
  getOrderDetails,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import {
  authMiddleware,
} from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

//
// ✅ Criar pedido
//

router.post(
  "/",
  authMiddleware,
  createOrder
);

//
// ✅ Meus pedidos
//

router.get(
  "/",
  authMiddleware,
  getOrders
);

//
// ✅ Detalhes pedido
//

router.get(
  "/:id",
  authMiddleware,
  getOrderDetails
);

//
// ✅ Admin - listar pedidos
//

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

//
// ✅ Admin - atualizar status
//

router.put(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

//
// ✅ Export
//

export default router;