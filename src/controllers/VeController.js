

import { VeThamQuan, TuyenThamQuan } from "../../models/index.js";

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

    //validate
    if (!ho_ten_khach || !sdt || !ngay_dat || !tuyen_tham_quan_id) {
      return res.status(400).json({
        success: false,
        message: "Vui long dien day du thong tin bat buoc",
      });
    }

    if (so_nguoi_lon === 0 && so_tre_em === 0) {
      return res.status(400).json({
        success: false,
        message: "Phai co it nhat 1 ng lon hoac 1 tre em",
      });
    }

    //lay thong tin tuyen de tinh tien
    const tuyen = await TuyenThamQuan.findByPk(tuyen_tham_quan_id);
    if (!tuyen) {
      return res.status(404).json({ message: "Tuyen ko ton tai" });
    }

    

    //tinh tong tien
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
      trang_thai: "cho_xac_nhan", //mac dinh cho xac nhan
    });

    const veWithTuyen = await VeThamQuan.findByPk(ve.id, {
      include: [
        {
          model: TuyenThamQuan,
          as: "tuyen_tham_quan",
          attributes: ["ten_tuyen_vi"],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: veWithTuyen,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "loi khi dat ve",
    });
    console.log(e);
  }
};

export const getAllVe = async (req, res) => {
  try {
    const ve = await VeThamQuan.findAll({
      include: [
        {
          model: TuyenThamQuan,
          as: "tuyen_tham_quan",
          attributes: ["ten_tuyen_vi"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(ve);
  } catch (e) {
    console.error("Lỗi lấy danh sách ve:", e);
    res.status(500).json({
      message: "Loi sever ko lay dc ds",
    });
  }
};

export const updateTrangThai = async (req, res) => {
  try {
    const { id } = req.params;
    const { trang_thai } = req.body;

    const valid = ["cho_xac_nhan", "da_xac_nhan", "da_huy"];
    if (!valid.includes(trang_thai)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ" });
    }

    const ve = await VeThamQuan.findByPk(id);
    if (!ve) return res.status(404).json({ message: "Vé không tồn tại" });

    ve.trang_thai = trang_thai;
    await ve.save();

    return res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: ve,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Lỗi server update trạng thái",
      error: e.message,
    });
  }
};

export const getVeByTrangThai = async (req, res) => {
  try {
    const { trang_thai } = req.params;

    const validStates = ["cho_xac_nhan", "da_xac_nhan", "da_duy"];
    if (!validStates.includes(trang_thai)) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái không hợp lệ",
      });
    }
    const ve = await VeThamQuan.findAll({
      where: { trang_thai },
      include: [
        {
          model: TuyenThamQuan,
          as: "tuyen_tham_quan",
          attributes: ["ten_tuyen_vi"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      success: true,
      data: ve,
      count: ve.length,
    });
  } catch (e) {
    console.error("Lỗi lấy danh sách ve:", e);
    res.status(500).json({
      success: true,
      message: "Loi sever ko lay dc ds",
      error: e.message,
    });
  }
};

// Thống kê vé theo trạng thái
export const getThongKeVe = async (req, res) => {
  try {
    const [total, choXacNhan, daXacNhan, daHuy] = await Promise.all([
      VeThamQuan.count(),
      VeThamQuan.count({ where: { trang_thai: "cho_xac_nhan" } }),
      VeThamQuan.count({ where: { trang_thai: "da_xac_nhan" } }),
      VeThamQuan.count({ where: { trang_thai: "da_huy" } }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        total,
        cho_xac_nhan: choXacNhan,
        da_xac_nhan: daXacNhan,
        da_huy: daHuy,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thống kê",
      error: error.message,
    });
  }
};

export const deleteVe = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!id) {
      return res.status(200).json({
        message: "id ko ton tai!",
      });
    }
    const ve = await VeThamQuan.findByPk(id);
    if (!ve) {
      return res.status(404).json({
        message: "ve ko ton tai",
      });
    }
    await VeThamQuan.destroy({ where: { id } });
    res.status(200).json({
      message: " delete ve sucessfull",
    });
  } catch (e) {
    console.error("Loi khi xoa", e);
    res.status(500).json({
      message: "error Server",
    });
  }
};

// GET /api/ve/doanh-thu

export const getDoanhThu = async (req, res) => {
  try {
    const doanhThu = await VeThamQuan.sum("tong_tien", {
      where: { trang_thai: "da_xac_nhan" }
    });

    res.json({ doanhThu });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// GET /api/ve/doanh-thu-theo-ngay
import { Sequelize } from "sequelize";

export const getDoanhThuTheoNgay = async (req, res) => {
  try {
    const { ngay } = req.query; // <-- Lấy ngày từ FE

    if (!ngay) {
      return res.status(400).json({ message: "Thiếu ngày!" });
    }

    // Lấy danh sách vé theo ngày
    const danhSach = await VeThamQuan.findAll({
      where: {
        trang_thai: "da_xac_nhan",
        ngay_dat: ngay
      },
      order: [["ngay_dat", "ASC"]],
    });

    // Tính tổng
    const tong = danhSach.reduce((sum, v) => sum + v.tong_tien, 0);

    res.json({
      doanhThu: tong,
      data: danhSach
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi server" });
  }
};