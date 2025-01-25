# CRM-Backend

# CRM Backend System

## Objective
This project is a backend system for a basic Customer Relationship Management (CRM) application. It provides APIs to manage customer data, user authentication, and search/filtering features, with a focus on scalability, security, and clean documentation.

---

## Features
- **Customer Management**: 
  - Perform CRUD operations on customers.
  - Fields include:
    - `id` (auto-generated unique identifier)
    - `name` (required)
    - `email` (required, unique)
    - `phone` (required)
    - `company` (optional)
    - `created_at` (auto-generated timestamp)
    - `updated_at` (auto-updated timestamp)

- **User Authentication**:
  - User registration and login.
  - Passwords are securely stored using hashing.
  - JWT-based authentication for API requests.

- **Search & Filtering**:
  - Search customers by name, email, or phone.
  - Filter customers by associated company.

- **Database Design**:
  - Relational database using PostgreSQL.
  - Customers are linked to users via relationships.

- **Error Handling and Validation**:
  - Validates email format, required fields, and more.
  - Provides proper HTTP status codes and error messages.

- **Documentation**:
  - API documented using Swagger/OpenAPI.

---

## Optional Features (Implemented)
- Pagination for customer lists.
- APIs for logging and retrieving customer interactions.
- Role-based access control (Admin vs. Regular User).

---

## Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Joi
- **Documentation**: Swagger (OpenAPI)

---

## Installation Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL
- Git

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/CRM-Backend.git
   cd CRM-Backend


npm install

npx sequelize-cli db:migrate


npm start

API Documentation: http://localhost:5000/api-docs

Usage
Authentication
Register: POST /api/auth/register
Login: POST /api/auth/login
Customers
Create Customer: POST /api/customers
Get All Customers: GET /api/customers
Get Customer by ID: GET /api/customers/:id
Update Customer: PUT /api/customers/:id
Delete Customer: DELETE /api/customers/:id
Search Customers: GET /api/customers/search?name=<name>&email=<email>&phone=<phone>
Filter by Company: GET /api/customers?company=<company_name>
