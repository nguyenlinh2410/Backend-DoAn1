import express from "express";
import { createVe ,getAllVe,deleteVe, getVeByTrangThai,getThongKeVe,updateTrangThai,getDoanhThu,getDoanhThuTheoNgay} from "../controllers/VeController.js";
const router = express.Router();

router.post("/create", createVe);
router.put("/updateTrangThai/:id/trang_thai", updateTrangThai);
router.get("/getAllVe", getAllVe);
router.get("/getVeBuyTT/:trang_thai", getVeByTrangThai);
router.get("/getVeThongKe", getThongKeVe);
router.delete("/deleteVe/:id", deleteVe);
router.get("/getDoanhThu", getDoanhThu);
router.get("/getDoanhThuTheoNgay", getDoanhThuTheoNgay);



export default router;
