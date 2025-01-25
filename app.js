const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/auth", authRoutes);
// app.use("/api", customerRoutes);
app.use("/api/customers", customerRoutes);

// API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
