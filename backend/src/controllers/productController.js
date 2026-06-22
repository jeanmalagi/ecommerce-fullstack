import pool from "../database/db.js";

const DEFAULT_PRODUCT_IMAGE =
  "/uploads/default-product.svg";

//
// ✅ Criar produto
//

export const createProduct =
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        stock,
        category,
        image_url,
      } = req.body;

      // ✅ Caminho imagem
      const imagePath =
        req.file
          ? `/uploads/${req.file.filename}`
          : image_url ||
            DEFAULT_PRODUCT_IMAGE;

      const result =
        await pool.query(
          `
          INSERT INTO products (
            name,
            description,
            price,
            stock,
            category,
            image_url
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
          `,
          [
            name,
            description,
            price,
            stock,
            category,
            imagePath,
          ]
        );

      return res.status(201).json(
        result.rows[0]
      );

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao criar produto",
      });
    }
  };

//
// ✅ Listar produtos
//

export const getProducts =
  async (req, res) => {
    try {
      const result =
        await pool.query(`
          SELECT *
          FROM products
          ORDER BY id DESC
        `);

      return res.json(
        result.rows
      );

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao buscar produtos",
      });
    }
  };

//
// ✅ Buscar produto por ID
//

export const getProductById =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const result =
        await pool.query(
          `
          SELECT *
          FROM products
          WHERE id = $1
          `,
          [id]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          error:
            "Produto não encontrado",
        });
      }

      return res.json(
        result.rows[0]
      );

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao buscar produto",
      });
    }
  };

//
// ✅ Atualizar produto
//

export const updateProduct =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const {
        name,
        description,
        price,
        stock,
        category,
        image_url,
      } = req.body;

      // ✅ Busca produto atual
      const currentProduct =
        await pool.query(
          `
          SELECT *
          FROM products
          WHERE id = $1
          `,
          [id]
        );

      if (
        currentProduct.rows
          .length === 0
      ) {
        return res.status(404).json({
          error:
            "Produto não encontrado",
        });
      }

      // ✅ Mantém imagem antiga
      const imagePath =
        req.file
          ? `/uploads/${req.file.filename}`
          : image_url
              ? image_url
          : currentProduct.rows[0]
              .image_url;

      const result =
        await pool.query(
          `
          UPDATE products
          SET
            name = $1,
            description = $2,
            price = $3,
            stock = $4,
            category = $5,
            image_url = $6
          WHERE id = $7
          RETURNING *
          `,
          [
            name,
            description,
            price,
            stock,
            category,
            imagePath,
            id,
          ]
        );

      return res.json(
        result.rows[0]
      );

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao atualizar produto",
      });
    }
  };

//
// ✅ Atualizar estoque
//

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (typeof stock !== "number" || stock < 0) {
      return res.status(400).json({
        error: "Valor de estoque inválido",
      });
    }

    const result = await pool.query(
      `
      UPDATE products
      SET stock = $1
      WHERE id = $2
      RETURNING *
      `,
      [stock, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Produto não encontrado",
      });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Erro ao atualizar estoque",
    });
  }
};

//
// ✅ Deletar produto
//

export const deleteProduct =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const result =
        await pool.query(
          `
          DELETE FROM products
          WHERE id = $1
          RETURNING *
          `,
          [id]
        );

      if (
        result.rows.length === 0
      ) {
        return res.status(404).json({
          error:
            "Produto não encontrado",
        });
      }

      return res.json({
        message:
          "Produto removido com sucesso",
      });

    } catch (err) {
      console.error(err);

      return res.status(500).json({
        error:
          "Erro ao deletar produto",
      });
    }
  };