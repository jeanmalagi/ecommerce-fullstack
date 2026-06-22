import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

//
// ✅ Middlewares
//

app.use(cors());

app.use(express.json());

//
// ✅ Pasta uploads pública
//

app.use(
  "/uploads",
  express.static("uploads")
);

//
// ✅ Rotas
//

app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/dashboard", dashboardRoutes);

export default app;