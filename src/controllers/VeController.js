import VeThamQuan from "../../models/vethamquan.js";
import TuyenThamQuan from "../../models/tuyenthamquan.js";

export const createVe = async (req, res) => {
  try {
    const {
      ho_ten_khach,
      sdt,
      email,
      so_nguoi_lon,
      so_tre_em,
      ngay_dat,
      tuyen_tham_quan_id,
    } = req.body;

    const tuyen = await TuyenThamQuan.findByPk(tuyen_tham_quan_id);
    if (!tuyen) {
      return res.status(404).json({ message: "Tuyen ko ton tai" });
    }
    const tong_tien =
      so_nguoi_lon * tuyen.gia_nguoi_lon + so_tre_em * tuyen.gia_tre_em;
    const ma_ve = VeThamQuan.generateMaVe();
    const ve = await VeThamQuan.create({
        ma_ve,
      ho_ten_khach,
      sdt,
      email,
      so_nguoi_lon,
      so_tre_em,
      ngay_dat,
      tong_tien,
      tuyen_tham_quan_id,
    });

    res.status(201).json({
      message: "Ticket created successfully",
      ve,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    console.log(e);
  }
};
