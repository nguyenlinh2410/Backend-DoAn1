import DiTich from "../models/ditich.js";

export const createDiTich = async (req, res) => {
  try {
    const {
      tieu_de_vi,
      tieu_de_en,
      slug,
      tom_tat_vi,
      tom_tat_en,
      noi_dung_vi,
      noi_dung_en,
      hinh_anh,
    } = req.body;

    const newDiTich = await DiTich.create({
      tieu_de_vi,
      tieu_de_en,
      slug,
      tom_tat_vi,
      tom_tat_en,
      noi_dung_vi,
      noi_dung_en,
      hinh_anh,
    });

    res.json({
      message: "Di tich created successfully",
      newDiTich,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    console.log(e);
  }
};

export const getAllDiTich = async (req, res) => {
  try {
    const ditich = await DiTich.findAll();
    res.status(200).json(ditich);
  } catch (e) {
    console.error("Lỗi lấy danh sách ditich:", e);
    res.status(500).json({
      message: "Loi sever ko lay dc ds",
    });
  }
};

export const deleteDiTich = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!id) {
      return res.status(200).json({
        message: "id ko ton tai!",
      });
    }
    const ditich = await DiTich.findByPk(id);
    if (!ditich) {
      return res.status(404).json({
        message: "di tich ko ton tai",
      });
    }
    await DiTich.destroy({ where: { id } });
    res.status(200).json({
      message: " delete di tich sucessfull",
    });
  } catch (e) {
    console.error("Loi khi xoa", e);
    res.status(500).json({
      message: "error Server",
    });
  }
};

export const updateDiTich = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { tieu_de_vi,
      tieu_de_en,
      slug,
      tom_tat_vi,
      tom_tat_en,
      noi_dung_vi,
      noi_dung_en,
      hinh_anh, } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "id ko ton tai!",
      });
    }
    const ditich = await DiTich.findByPk(id);
    if (!ditich) {
      return res.status(404).json({
        message: "di tich ko ton tai",
      });
    }
    await ditich.update({
      tieu_de_vi,
      tieu_de_en,
      slug,
      tom_tat_vi,
      tom_tat_en,
      noi_dung_vi,
      noi_dung_en,
      hinh_anh,
    });

    return res.status(200).json({
      message: "Cập nhật di tich thành công",
      ditich,
    });
  } catch (e) {
    console.error("Lỗi update di tich:", e);
    res.status(500).json({
      message: "Loi sever update",
    });
  }
};

export const getDiTichById = async (req, res) => {
  try {
    const { id } = req.params;
    const ditich = await DiTich.findByPk(id);
    if (!ditich) {
      return res.status(404).json({
        message: "di tich ko ton tai!",
      });
    }
    return res.status(200).json({ ditich });
  } catch (e) {
    console.error("Lỗi khi lấy di tich: ", e);
    res.status(500).json({
      message: "Error server",
    });
  }
};