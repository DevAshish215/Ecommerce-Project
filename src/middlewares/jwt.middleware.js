import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  // expected format: "Bearer <token>"
  const parts = auth.split(" ");
  if (!parts || parts.length !== 2) {
    return res.status(401).json({ error: "Invalid Authorization header format" });
  }
  const token = parts[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "changeme_replace_with_secure_secret");
    // attach user payload to request for downstream routes
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default jwtAuth;
