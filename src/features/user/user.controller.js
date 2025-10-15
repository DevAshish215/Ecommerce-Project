import UserModel from "./user.model.js";
import removePassword from "../../utils/removePassword.js";

export default class UserController {
  static async getAll(req, res, next) {
    try {
      const all = await UserModel.all();
      // remove password before sending
      const withoutPasswords = all.map(removePassword);
      res.json(withoutPasswords);
    } catch (err) {
      next(err);
    }
  }

  // basic register endpoint (no hashing yet; we'll replace in Auth milestone)
  static async register(req, res, next) {
    try {
      const { name, email, password, type } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "name, email, password required" });
      }
      const existing = await UserModel.findByEmail(email);
      if (existing) {
        return res.status(409).json({ error: "email already in use" });
      }
      const user = await UserModel.create({ name, email, password, type });
      res.status(201).json(removePassword(user));
    } catch (err) {
      next(err);
    }
  }

  // login placeholder — returns dummy success (we'll replace in Auth milestone)
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "email & password required" });
      }
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "invalid credentials" });
      }
      // plaintext check for now (we'll hash + JWT later)
      if (user.password !== password) {
        return res.status(401).json({ error: "invalid credentials" });
      }
      // for now return user (without password). We'll issue a JWT in next milestone.
      res.json(removePassword(user));
    } catch (err) {
      next(err);
    }
  }
}
