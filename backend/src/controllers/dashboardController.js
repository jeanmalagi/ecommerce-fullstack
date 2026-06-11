import pool from "../database/db.js";

export const getDashboardData =
  async (req, res) => {
    try {
      // ✅ Total vendas
      const salesResult =
        await pool.query(`
          SELECT
            COALESCE(SUM(total), 0)
              AS total_sales
          FROM orders
        `);

      // ✅ Total pedidos
      const ordersResult =
        await pool.query(`
          SELECT COUNT(*) AS total_orders
          FROM orders
        `);

      // ✅ Total clientes
      const usersResult =
        await pool.query(`
          SELECT COUNT(*) AS total_users
          FROM users
          WHERE is_admin = false
        `);

      // ✅ Estoque crítico
      const stockResult =
        await pool.query(`
          SELECT COUNT(*) AS low_stock
          FROM products
          WHERE stock <= 5
        `);

      // ✅ Pedidos recentes
      const recentOrders =
        await pool.query(`
          SELECT
            orders.id,
            orders.total,
            orders.status,
            orders.created_at,
            users.name AS user_name

          FROM orders

          JOIN users
            ON users.id =
               orders.user_id

          ORDER BY orders.created_at DESC
          LIMIT 5
        `);

      // ✅ Produtos estoque baixo
      const criticalProducts =
        await pool.query(`
          SELECT
            id,
            name,
            stock

          FROM products

          WHERE stock <= 5

          ORDER BY stock ASC
          LIMIT 5
        `);

      return res.json({
        totalSales:
          salesResult.rows[0]
            .total_sales,

        totalOrders:
          ordersResult.rows[0]
            .total_orders,

        totalUsers:
          usersResult.rows[0]
            .total_users,

        lowStock:
          stockResult.rows[0]
            .low_stock,

        recentOrders:
          recentOrders.rows,

        criticalProducts:
          criticalProducts.rows,
      });

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro dashboard",
      });
    }
  };