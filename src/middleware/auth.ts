import dotenv from "dotenv";
import basicAuth from "express-basic-auth";

dotenv.config();

const authMiddleware = basicAuth({
    users: {
        [process.env.BASIC_AUTH_USERNAME || 'admin']: process.env.BASIC_AUTH_PASSWORD || 'password123',
    },
    challenge: true,
    realm: 'Book Management API',
});

export default authMiddleware;
