import express from "express";

const router = express.Router();

import {
  getDashboardData,
} from "../controllers/dashboardController.js";

import {
  authMiddleware,
} from "../middlewares/authMiddleware.js";

router.get(
  "/",
  authMiddleware,
  getDashboardData
);

export default router;