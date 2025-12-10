import express from "express";
import {
  createUser,
  getAllUsers,
  deleteUsers,
  updateUser,
  getUserById,
  login,createLienHe,getAllLienHe,deleteLienHe
} from "../controllers/UserController.js";

const router = express.Router();
router.get("/api/getAllLienHe", getAllLienHe);
router.post("/api/create/lienhe", createLienHe);
router.delete("/api/deleteLienHe/:id", deleteLienHe);

router.post("/api/create/users", createUser);
router.get("/api/getAllusers", getAllUsers);
router.delete("/api/deleteUser/:id", deleteUsers);
router.put("/api/updateUser/:id", updateUser);
router.get("/api/getUser/:id", getUserById);
router.post("/login", login);

export default router;
