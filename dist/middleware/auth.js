"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuth = basicAuth;
function basicAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is required" });
    }
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
        .toString()
        .split(":");
    if (username === process.env.BASIC_AUTH_USERNAME && password === process.env.BASIC_AUTH_PASSWORD) {
        return next();
    }
    return res.status(403).json({ message: "Forbidden" });
}
