import express from "express";

import {
  login,
  register,
} from "../controllers/userController.js";

const router = express.Router();

//
// ✅ Registro
//

router.post(
  "/register",
  register
);

//
// ✅ Login
//

router.post(
  "/login",
  login
);

export default router;