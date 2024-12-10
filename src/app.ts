import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./data-source";
import bookRoutes from './routes/bookRoutes';
import authMiddleware from './middleware/auth';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));

// Database initialization
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");
        console.log("isInitialized:", AppDataSource.isInitialized);
    })
    .catch((error) => console.error("Database connection failed:", error));

// Use book routes
app.use('/api', authMiddleware, bookRoutes);  // Secure all book routes


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
