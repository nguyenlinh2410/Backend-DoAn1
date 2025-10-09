import express from "express";
import {
  createUser,
  getAllUsers,
  deleteUsers,
  updateUser,
  getUserById,login
} from "../controllers/UserController.js";

const router = express.Router();
router.post("/api/create/users", createUser);
router.get("/api/getAllusers", getAllUsers);
router.delete("/api/deleteUser/:id", deleteUsers);
router.put("/api/updateUser/:id", updateUser);
router.get("/api/getUser/:id", getUserById);
router.post("/login", login);

export default router;
