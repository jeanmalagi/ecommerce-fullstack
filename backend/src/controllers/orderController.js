import pool from "../database/db.js";

//
// ✅ Criar pedido
//

export const createOrder = async (
  req,
  res
) => {
  const client =
    await pool.connect();

  try {
    await client.query("BEGIN");

    const userId =
      req.user.id;

    // ✅ Buscar carrinho
    const cartResult =
      await client.query(
        `
        SELECT
          cart_items.id,
          cart_items.quantity,
          products.id AS product_id,
          products.name,
          products.price,
          products.stock
        FROM cart_items
        JOIN products
          ON products.id =
             cart_items.product_id
        WHERE cart_items.user_id = $1
        `,
        [userId]
      );

    const cart =
      cartResult.rows;

    // ✅ Carrinho vazio
    if (cart.length === 0) {
      return res.status(400).json({
        error: "Carrinho vazio",
      });
    }

    // ✅ Validar estoque
    for (const item of cart) {
      if (
        item.quantity >
        item.stock
      ) {
        return res.status(400).json({
          error:
            `Estoque insuficiente para ${item.name}`,
        });
      }
    }

    // ✅ Total
    const total = cart.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
          item.quantity,
      0
    );

    // ✅ Criar pedido
    const orderResult =
      await client.query(
        `
        INSERT INTO orders (
          user_id,
          total,
          status
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
          userId,
          total,
          "pending",
        ]
      );

    const order =
      orderResult.rows[0];

    // ✅ Criar itens
    for (const item of cart) {
      await client.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          quantity,
          price
        )
        VALUES ($1, $2, $3, $4)
        `,
        [
          order.id,
          item.product_id,
          item.quantity,
          item.price,
        ]
      );

      // ✅ Baixar estoque
      await client.query(
        `
        UPDATE products
        SET stock = stock - $1
        WHERE id = $2
        `,
        [
          item.quantity,
          item.product_id,
        ]
      );
    }

    // ✅ Limpar carrinho
    await client.query(
      `
      DELETE FROM cart_items
      WHERE user_id = $1
      `,
      [userId]
    );

    await client.query("COMMIT");

    return res.status(201).json({
      message:
        "Pedido criado com sucesso",
      order,
    });

  } catch (err) {
    await client.query(
      "ROLLBACK"
    );

    console.error(err);

    return res.status(500).json({
      error:
        "Erro ao finalizar pedido",
    });

  } finally {
    client.release();
  }
};

//
// ✅ Buscar pedidos
//

export const getOrders = async (
  req,
  res
) => {
  try {
    const result =
      await pool.query(
        `
        SELECT *
        FROM orders
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
        [req.user.id]
      );

    return res.json(
      result.rows
    );

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error:
        "Erro ao buscar pedidos",
    });
  }
};

//
// ✅ Detalhes pedido
//

export const getOrderDetails =
  async (req, res) => {
    try {
      const { id } = req.params;

      // ✅ Busca pedido
      const orderResult =
        await pool.query(
          `
          SELECT *
          FROM orders
          WHERE id = $1
          AND user_id = $2
          `,
          [
            id,
            req.user.id,
          ]
        );

      // ✅ Pedido não encontrado
      if (
        orderResult.rows.length === 0
      ) {
        return res.status(404).json({
          error:
            "Pedido não encontrado",
        });
      }

      // ✅ Busca itens
      const itemsResult =
        await pool.query(
          `
          SELECT
            order_items.id,
            order_items.quantity,
            order_items.price,

            products.name,
            products.image_url

          FROM order_items

          JOIN products
            ON products.id =
               order_items.product_id

          WHERE order_items.order_id = $1
          `,
          [id]
        );

      return res.json({
        order:
          orderResult.rows[0],
        items:
          itemsResult.rows,
      });

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao buscar pedido",
      });
    }
  };
//
// ✅ Admin - listar pedidos
//

export const getAllOrders =
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          SELECT
            orders.*,
            users.name AS user_name,
            users.email

          FROM orders

          JOIN users
            ON users.id =
               orders.user_id

          ORDER BY orders.created_at DESC
          `
        );

      return res.json(
        result.rows
      );

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao buscar pedidos",
      });
    }
  };
//
// ✅ Atualizar status pedido
//

export const updateOrderStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { status } =
        req.body;

      const result =
        await pool.query(
          `
          UPDATE orders
          SET status = $1
          WHERE id = $2
          RETURNING *
          `,
          [status, id]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          error:
            "Pedido não encontrado",
        });
      }

      return res.json(
        result.rows[0]
      );

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao atualizar status",
      });
    }
  };    