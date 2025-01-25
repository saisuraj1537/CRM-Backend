const { 
    createCustomer, 
    getCustomerById, 
    getAllCustomers, 
    updateCustomer, 
    deleteCustomer, 
    searchCustomers, 
    filterCustomersByCompany 
  } = require("../models/customer");

  const pool = require("../utils/db");
  
  // Create a new customer
  exports.createCustomer = async (req, res, next) => {
    try {
      const { name, email, phone, company } = req.body;
      const customer = await createCustomer({ 
        name, 
        email, 
        phone, 
        company, 
        userId: req.userId // Assuming userId is set by middleware after authentication
      });
      res.status(201).json(customer);
    } catch (err) {
      next(err);
    }
  };
  
  // Retrieve a customer by ID
  exports.getCustomerById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await getCustomerById(id);
  
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      res.status(200).json(customer);
    } catch (err) {
      next(err);
    }
  };
  
  // Retrieve all customers
  exports.getAllCustomers = async (req, res, next) => {
    try {
      const customers = await getAllCustomers();
      res.status(200).json(customers);
    } catch (err) {
      next(err);
    }
  };
  
  // Update a customer
  exports.updateCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, phone, company } = req.body;
  
      const updatedCustomer = await updateCustomer(id, { name, email, phone, company });
  
      if (!updatedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      res.status(200).json(updatedCustomer);
    } catch (err) {
      next(err);
    }
  };
  
  // Delete a customer
  exports.deleteCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const deletedCustomer = await deleteCustomer(id);
  
      if (!deletedCustomer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
      next(err);
    }
  };
  
  // Search customers by name, email, or phone

  exports.searchCustomers = async (req, res) => {
    try {
      const { name, email, phone } = req.query;
  
      // Build query dynamically
      let query = "SELECT * FROM customers WHERE 1=1";
      const values = [];
      let index = 1; // Placeholder index
  
      if (name) {
        query += ` AND name ILIKE $${index++}`;
        values.push(`%${name}%`);
      }
      if (email) {
        query += ` AND email ILIKE $${index++}`;
        values.push(`%${email}%`);
      }
      if (phone) {
        query += ` AND phone ILIKE $${index++}`;
        values.push(`%${phone}%`);
      }
  
      // Execute query
      const result = await pool.query(query, values);
  
      // Respond with results
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  // Filter customers by company
  exports.filterCustomersByCompany = async (req, res, next) => {
    try {
      const { company } = req.query;
  
      if (!company) {
        return res.status(400).json({ message: "Company query parameter is required" });
      }
  
      const customers = await filterCustomersByCompany(company);
      res.status(200).json(customers);
    } catch (err) {
      next(err);
    }
  };
  

  exports.searchAndFilterCustomers = async (req, res) => {
    console.log("Hii")
    const { name, email, phone, company } = req.query;
    console.log(name, email, phone, company)
  
    try {
      let query = 'SELECT * FROM customers WHERE 1=1';  // Start with a basic query
      const params = [];
      let paramIndex = 1;
  
      // Add filters if provided
      if (name) {
        query += ` AND name ILIKE $${paramIndex++}`;
        params.push(`%${name}%`);
      }
      if (email) {
        query += ` AND email ILIKE $${paramIndex++}`;
        params.push(`%${email}%`);
      }
      if (phone) {
        query += ` AND phone ILIKE $${paramIndex++}`;
        params.push(`%${phone}%`);
      }
      if (company) {
        query += ` AND company ILIKE $${paramIndex++}`;
        params.push(`%${company}%`);
      }
  
      const result = await pool.query(query, params);
      
      res.status(200).json(result.rows); // Return the filtered customers
    } catch (err) {
      res.status(500).json({ message: "Error fetching customers", error: err.message });
    }
  };