import express from "express";

const router = express.Router();

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

//
// ✅ Buscar carrinho
//

router.get(
  "/",
  authMiddleware,
  getCart
);

//
// ✅ Adicionar item
//

router.post(
  "/",
  authMiddleware,
  addToCart
);

//
// ✅ Atualizar quantidade
//

router.put(
  "/:id",
  authMiddleware,
  updateCartItem
);

//
// ✅ Remover item
//

router.delete(
  "/:id",
  authMiddleware,
  removeFromCart
);

export default router;