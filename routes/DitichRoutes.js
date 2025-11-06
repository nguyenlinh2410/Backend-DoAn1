import express from "express";
import {
  createDiTich,
  getAllDiTich,
  deleteDiTich,getDiTichById,updateDiTich
} from "../controllers/DitichController.js";

const router = express.Router();
router.post("/create", createDiTich);
router.get("/getAllDiTich", getAllDiTich);
router.delete("/deleteDiTich/:id", deleteDiTich);
router.put("/updateDiTich/:id", updateDiTich);
router.get("/getDiTich/:id", getDiTichById);

export default router;
