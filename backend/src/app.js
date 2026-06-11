import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

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

export default app;