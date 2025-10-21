import express from "express";
import { createDiTich } from "../controllers/DitichController.js";

const router = express.Router();
router.post("/create", createDiTich);

export default router;
