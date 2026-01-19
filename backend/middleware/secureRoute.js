import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    // 1. Check Cookie first (Safe navigation using ?.)
    // If req.cookies is undefined, this won't crash
    let token = req.cookies?.jwt;

    // 2. If no cookie, check Authorization Header
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    // DEBUGGING: Remove this line after fixing the issue
    console.log("Token received in backend:", token); 

    // 3. Strict Check: Ensure token exists and is NOT the string "null" or "undefined"
    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // 4. Verify Token
    // MAKE SURE 'JWT_TOKEN' MATCHES YOUR .ENV FILE EXACTLY
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
        return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("Error in secureRoute: ", error.message);
    
    // Handle specific JWT errors gracefully
    if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid Token (Malformed)" });
    }
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token Expired" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export default secureRoute;