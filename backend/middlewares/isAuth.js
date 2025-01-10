// const jwt = require("jsonwebtoken");

// const isAuthenticated = async (req, res, next) => {
//   //! Get the token from the header
//   const headerObj = req.headers;
//   const token = headerObj?.authorization?.split(" ")[1];
//   //!Verify the token
//   const verifyToken = jwt.verify(token, "masynctechKey", (err, decoded) => {
//     if (err) {
//       return false;
//     } else {
//       return decoded;
//     }
//   });
//   if (verifyToken) {
//     //!Save the user req obj
//     req.user = verifyToken.id;
//     next();
//   } else {
//     const err = new Error("Token expired, login again");
//     next(err);
//   }
// };

// module.exports = isAuthenticated;

const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    //! Get the token from the header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token not found");
    }

    console.log("Token received:", token);

    //! Verify the token
    const decoded = jwt.verify(token, "masynctechKey"); // Verify the token
    req.user = decoded.id; // Attach the decoded user ID to the request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("JWT Error:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid or malformed token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    } else {
      return res.status(401).json({ message: error.message || "Unauthorized" });
    }
  }
};

module.exports = isAuthenticated;


