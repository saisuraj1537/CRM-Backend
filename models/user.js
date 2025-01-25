const pool = require("../utils/db");
const bcrypt = require("bcrypt");

exports.createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
    [name, email, hashedPassword]
  );
  return result.rows[0].id;
};

exports.findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};


exports.getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  console.log("Hi")
  return result.rows;
};