const pool = require("../utils/db");

// Create a new customer
exports.createCustomer = async ({ name, email, phone, company, userId }) => {
  const result = await pool.query(
    `INSERT INTO customers (name, email, phone, company, user_id, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
    [name, email, phone, company, userId]
  );
  return result.rows[0];
};

// Retrieve a customer by ID
exports.getCustomerById = async (customerId) => {
  const result = await pool.query(
    `SELECT * FROM customers WHERE id = $1`,
    [customerId]
  );
  return result.rows[0];
};

// Retrieve all customers
exports.getAllCustomers = async () => {
  const result = await pool.query(`SELECT * FROM customers ORDER BY created_at DESC`);
  return result.rows;
};

// Update a customer's details
exports.updateCustomer = async (customerId, { name, email, phone, company }) => {
  const result = await pool.query(
    `UPDATE customers
     SET name = $1, email = $2, phone = $3, company = $4, updated_at = NOW()
     WHERE id = $5
     RETURNING *`,
    [name, email, phone, company, customerId]
  );
  return result.rows[0];
};

// Delete a customer
exports.deleteCustomer = async (customerId) => {
  const result = await pool.query(
    `DELETE FROM customers WHERE id = $1 RETURNING *`,
    [customerId]
  );
  return result.rows[0];
};

// Search customers by name, email, or phone
exports.searchCustomers = async (query) => {
  const result = await pool.query(
    `SELECT * FROM customers 
     WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1
     ORDER BY created_at DESC`,
    [`%${query}%`]
  );
  return result.rows;
};

// Filter customers by company
exports.filterCustomersByCompany = async (company) => {
  const result = await pool.query(
    `SELECT * FROM customers 
     WHERE company = $1
     ORDER BY created_at DESC`,
    [company]
  );
  return result.rows;
};
