import express from "express";
import UserController from "./user.controller.js";

const router = express.Router();

// public: list users (this returns users without password)
router.get("/", UserController.getAll);

// register
router.post("/register", UserController.register);

// login
router.post("/login", UserController.login);

export default router;
