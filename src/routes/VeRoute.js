import express from "express";
import { createVe ,getAllVe,deleteVe} from "../controllers/VeController.js";
const router = express.Router();
router.post("/create", createVe);

router.get("/getAllVe", getAllVe);
router.delete("/deleteVe/:id", deleteVe);



export default router;
