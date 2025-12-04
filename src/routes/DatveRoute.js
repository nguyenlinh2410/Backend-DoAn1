import express from "express";
import {
  createTuyen,
  getAllTuyen,
  getImage,
  deleteTuyen,getTuyenById,updateTuyen
} from "../controllers/DatveController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
router.post("/create", upload.single("hinh_anh"), createTuyen);
router.get("/getAllTuyen", getAllTuyen);
router.get("/:id/image", getImage);
router.delete("/deleteTuyen/:id", deleteTuyen);
router.get("/getTuyen/:id", getTuyenById);
router.put("/updateTuyen/:id", upload.single("hinh_anh"), updateTuyen);



export default router;
