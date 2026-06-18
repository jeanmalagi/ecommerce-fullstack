import express from "express";

const router = express.Router();

import {
  getDashboardData,
} from "../controllers/dashboardController.js";

import {
  authMiddleware,
} from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getDashboardData
);

export default router;