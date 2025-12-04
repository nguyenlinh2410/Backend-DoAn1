import express from "express";
import { createVe } from "../controllers/VeController.js";
const router = express.Router();
router.post("/create", createVe);




export default router;
