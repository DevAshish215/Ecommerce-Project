import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import errorHandler from "./src/middlewares/error.middleware.js";

dotenv.config();

const app = express();

// Required by your preference:
app.use(express.urlencoded({ extended: true }));

// JSON parser
app.use(express.json());

// Common middleware
app.use(cors());
app.use(morgan("dev"));

// Health
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Ecom API scaffold running" });
});

// Public users route (registration/login endpoints would go under /api/users)
app.use("/api/users", userRouter);

// Example protected route group (we'll add product routes later). Protected by JWT middleware example:
app.use("/api/products", jwtAuth, (req, res) => {
  res.status(200).json({ message: "Products endpoint (protected) - coming soon, Change 1" });
});

// Central error handler (last)
app.use(errorHandler);

// start
const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
