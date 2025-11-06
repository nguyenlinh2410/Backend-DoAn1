import DiSan from "../models/disan.js";
import slugify from "slugify";

export const createDiSan = async (req, res) => {
  try {
    const {
      tieu_de_vi,
      tieu_de_en,
      tom_tat_vi,
      tom_tat_en,
      noi_dung_vi,
      noi_dung_en,
      hinh_anh,
      danh_muc_id,
    } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!tieu_de_vi || !tieu_de_en || !danh_muc_id) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    // Tự sinh slug từ tiêu đề tiếng Việt
    const slug = slugify(tieu_de_vi, { lower: true, locale: "vi" });
    const exitsting = await DiSan.findOne({
      where: { slug },
    });
    if (exitsting) {
      slug = `${slug}-${Date.now()}`;
    }

    // Tạo di sản
    const disan = await DiSan.create({
      tieu_de_vi,
      tieu_de_en,
      slug,
      tom_tat_vi,
      tom_tat_en,
      noi_dung_vi,
      noi_dung_en,
      hinh_anh,
      danh_muc_id,
    });

    res.status(201).json({
      message: "Tạo di sản thành công!",
      data: disan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo di sản!", error });
  }
};
