const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {

  try {

    // get authorization header
    const authHeader = req.headers.authorization;

    // check token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // extract token
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, "mykey");

    // attach decoded data to request
    req.user = decoded;

    // check admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    // continue to next route
    next();

  } catch (err) {

    console.log(err);
    res.status(401).json({ message: "Invalid token" });

  }

};

module.exports = adminMiddleware;