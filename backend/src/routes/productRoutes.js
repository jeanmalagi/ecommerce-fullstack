import express from "express";

const router = express.Router();

import upload from "../middlewares/uploadMiddleware.js";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import {
  authMiddleware,
} from "../middlewares/authMiddleware.js";

//
// ✅ Listar produtos
//

router.get(
  "/",
  getProducts
);

//
// ✅ Buscar produto por ID
//

router.get(
  "/:id",
  getProductById
);

//
// ✅ Criar produto
//

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createProduct
);

//
// ✅ Atualizar produto
//

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateProduct
);

//
// ✅ Deletar produto
//

router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);

export default router;