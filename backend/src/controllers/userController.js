import pool from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//
// ✅ Registrar usuário
//

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // ✅ Verifica se usuário existe
    const userExists = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        error: "Usuário já cadastrado",
      });
    }

    // ✅ Criptografa senha
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // ✅ Cria usuário
    const result = await pool.query(
      `
      INSERT INTO users (
        name,
        email,
        password
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        name,
        email,
        is_admin
      `,
      [
        name,
        email,
        hashedPassword,
      ]
    );

    return res.status(201).json({
      message:
        "Usuário criado com sucesso",

      user: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error:
        "Erro ao registrar usuário",
    });
  }
};

//
// ✅ Login
//

export const login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    console.log(
      "📩 LOGIN REQUEST:",
      email,
      password
    );

    // ✅ Busca usuário
    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    // ✅ Usuário não encontrado
    if (result.rows.length === 0) {
      return res.status(401).json({
        error:
          "Email ou senha inválidos",
      });
    }

    const user = result.rows[0];

    console.log(
      "👤 USER DO BANCO:",
      user
    );

    // ✅ Compara senha criptografada
    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    console.log(
      "🔐 PASSWORD MATCH:",
      passwordMatch
    );

    // ✅ Senha inválida
    if (!passwordMatch) {
      return res.status(401).json({
        error:
          "Email ou senha inválidos",
      });
    }

    // ✅ Token fake
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      },
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error:
        "Erro ao fazer login",
    });
  }
};