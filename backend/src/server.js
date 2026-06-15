import app from "./app.js";
import orderRoutes
  from "./routes/orderRoutes.js";
import dashboardRoutes
  from "./routes/dashboardRoutes.js";  

app.listen(3000, '0.0.0.0', () => {
  console.log('🚀 Server running on port 3000');
});

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);