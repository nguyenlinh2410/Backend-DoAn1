import express from "express";
import {
  createDiSan,
  getDanhMuc,
  getAllDiSan,
  deleteDiSan,
  getDiSanById,
  updateDiSan,
  getByDanhMuc,getByDiSanBySlug
} from "../controllers/DisanController.js";

const router = express.Router();
router.post("/create", createDiSan);
router.get("/list", getDanhMuc);
router.get("/getAllDiSan", getAllDiSan);
router.delete("/deleteDiSan/:id", deleteDiSan);
router.put("/updateDiSan/:id", updateDiSan);
router.get("/getDiSan/:id", getDiSanById);
router.get("/getByDanhmuc/:danh_muc_id", getByDanhMuc);
router.get("/getByDiSanSlug/:slug", getByDiSanBySlug);

export default router;
