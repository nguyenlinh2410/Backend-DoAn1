import express from "express";
import { createDiSan, getDanhMuc,getAllDiSan,deleteDiSan,getDiSanById,updateDiSan } from "../controllers/DisanController.js";

const router = express.Router();
router.post("/create", createDiSan);
router.get("/list", getDanhMuc);
router.get("/getAllDiSan", getAllDiSan);
router.delete("/deleteDiSan/:id", deleteDiSan);
router.put("/updateDiSan/:id", updateDiSan);
router.get("/getDiSan/:id", getDiSanById);


export default router;
