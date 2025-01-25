const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
  filterCustomersByCompany,searchAndFilterCustomers, 
} = require("../controllers/customerController");

const router = express.Router();

// Create a new customer
router.post("/", authMiddleware, createCustomer);

// Retrieve a customer by ID
router.get("/:id", authMiddleware, getCustomerById);

// Retrieve all customers
router.get("/", authMiddleware, getAllCustomers);

// Update a customer
router.put("/:id", authMiddleware, updateCustomer);

// Delete a customer
router.delete("/:id", authMiddleware, deleteCustomer);

// Search customers by name, email, or phone
router.get("/search", searchCustomers);

// Filter customers by company
router.get("/filter", authMiddleware, filterCustomersByCompany);

module.exports = router;
