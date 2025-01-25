const { createUser, findUserByEmail ,getAllUsers} = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
const pool = require("../utils/db");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userId = await createUser({ name, email, password });
    res.status(201).json({ id: userId });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user.id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM users");
      res.status(200).json(result.rows); // Send back the users as a JSON response
    } catch (err) {
      res.status(500).json({ message: "Error fetching users", error: err.message });
    }
  };

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Error fetching user", error: err.message });
    }
  };
  
  // Update user
  exports.updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const result = await pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Error updating user", error: err.message });
    }
  };
  
  // Delete user
  exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully", user: result.rows[0] });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user", error: err.message });
    }
  };
