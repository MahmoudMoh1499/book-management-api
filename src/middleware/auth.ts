// src/middleware/auth.ts

import dotenv from "dotenv";
import basicAuth from "express-basic-auth";

// Load environment variables
dotenv.config();

// Configure basic authentication middleware
const authMiddleware = basicAuth({
    users: {
        [process.env.BASIC_AUTH_USERNAME || 'admin']: process.env.BASIC_AUTH_PASSWORD || 'password123',
    },
    challenge: true,
    realm: 'Book Management API',
});

export default authMiddleware;
