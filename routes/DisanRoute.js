import express from "express";
import { createDiSan } from "../controllers/DisanController.js";
const router = express.Router();
router.post("/create", createDiSan);


export default router;
