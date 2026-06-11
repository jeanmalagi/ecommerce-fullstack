import pool from "../database/db.js";

//
// ✅ Buscar carrinho
//

export const getCart = async (
  req,
  res
) => {
  try {
    const result = await pool.query(
      `
      SELECT
        cart_items.id,
        cart_items.quantity,

        products.id AS product_id,
        products.name AS product_name,
        products.price AS product_price,
        products.image_url,
        products.stock

      FROM cart_items

      JOIN products
        ON products.id =
           cart_items.product_id

      WHERE cart_items.user_id = $1

      ORDER BY cart_items.id DESC
      `,
      [req.user.id]
    );

    return res.json({
      cart: result.rows,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error:
        "Erro ao buscar carrinho",
    });
  }
};

//
// ✅ Adicionar item
//

export const addToCart = async (
  req,
  res
) => {
  try {
    const { product_id, quantity } =
      req.body;

    // ✅ Produto obrigatório
    if (!product_id) {
      return res.status(400).json({
        error:
          "Produto obrigatório",
      });
    }

    // ✅ Busca produto
    const productResult =
      await pool.query(
        `
        SELECT *
        FROM products
        WHERE id = $1
        `,
        [product_id]
      );

    // ✅ Produto não encontrado
    if (
      productResult.rows.length === 0
    ) {
      return res.status(404).json({
        error:
          "Produto não encontrado",
      });
    }

    const product =
      productResult.rows[0];

    // ✅ Busca item existente
    const existing =
      await pool.query(
        `
        SELECT *
        FROM cart_items
        WHERE user_id = $1
        AND product_id = $2
        `,
        [
          req.user.id,
          product_id,
        ]
      );

    // ✅ Já existe
    if (existing.rows.length > 0) {
      const item =
        existing.rows[0];

      const newQuantity =
        item.quantity +
        Number(quantity || 1);

      // ✅ Validar estoque
      if (
        newQuantity >
        product.stock
      ) {
        return res.status(400).json({
          error:
            "Estoque insuficiente",
        });
      }

      const result =
        await pool.query(
          `
          UPDATE cart_items
          SET quantity = $1
          WHERE id = $2
          RETURNING *
          `,
          [
            newQuantity,
            item.id,
          ]
        );

      return res.json(
        result.rows[0]
      );
    }

    // ✅ Novo item
    if (
      Number(quantity || 1) >
      product.stock
    ) {
      return res.status(400).json({
        error:
          "Estoque insuficiente",
      });
    }

    const result =
      await pool.query(
        `
        INSERT INTO cart_items (
          user_id,
          product_id,
          quantity
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
          req.user.id,
          product_id,
          quantity || 1,
        ]
      );

    return res.status(201).json(
      result.rows[0]
    );

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error:
        "Erro ao adicionar ao carrinho",
    });
  }
};

//
// ✅ Atualizar quantidade
//

export const updateCartItem =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { quantity } =
        req.body;

      // ✅ Busca item
      const itemResult =
        await pool.query(
          `
          SELECT
            cart_items.*,
            products.stock
          FROM cart_items
          JOIN products
            ON products.id =
               cart_items.product_id
          WHERE cart_items.id = $1
          `,
          [id]
        );

      if (
        itemResult.rows.length === 0
      ) {
        return res.status(404).json({
          error:
            "Item não encontrado",
        });
      }

      const item =
        itemResult.rows[0];

      // ✅ Estoque limite
      if (
        quantity > item.stock
      ) {
        return res.status(400).json({
          error:
            "Estoque insuficiente",
        });
      }

      const result =
        await pool.query(
          `
          UPDATE cart_items
          SET quantity = $1
          WHERE id = $2
          RETURNING *
          `,
          [quantity, id]
        );

      return res.json(
        result.rows[0]
      );

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao atualizar carrinho",
      });
    }
  };

//
// ✅ Remover item
//

export const removeFromCart =
  async (req, res) => {
    try {
      const { id } = req.params;

      await pool.query(
        `
        DELETE FROM cart_items
        WHERE id = $1
        `,
        [id]
      );

      return res.json({
        message:
          "Item removido",
      });

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao remover item",
      });
    }
  };