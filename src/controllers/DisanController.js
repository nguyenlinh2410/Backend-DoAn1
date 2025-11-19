import DiSan from "../../models/disan.js";
import slugify from "slugify";
import DanhMucDiSan from "../../models/danhmucdisan.js";

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
    let slug = slugify(tieu_de_vi, { lower: true, locale: "vi" });
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

export const getDanhMuc = async (req, res) => {
  try {
    const danhMuc = await DanhMucDiSan.findAll();
    res.status(200).json(danhMuc);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      mesage: "Lỗi khi lấy danh mục",
    });
  }
};

export const getAllDiSan = async (req, res) => {
  try {
    const disan = await DiSan.findAll();
    res.status(200).json(disan);
  } catch (e) {
    console.error("Lỗi lấy danh sách di sản:", e);
    res.status(500).json({
      message: "Loi sever ko lay dc ds",
    });
  }
};

export const deleteDiSan= async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!id) {
      return res.status(200).json({
        message: "id ko ton tai!",
      });
    }
    const disan= await DiSan.findByPk(id);
    if (!disan) {
      return res.status(404).json({
        message: "di sản ko ton tai",
      });
    }
    await DiSan.destroy({ where: { id } });
    res.status(200).json({
      message: " delete di sản sucessfull",
    });
  } catch (e) {
    console.error("Loi khi xoa", e);
    res.status(500).json({
      message: "error Server",
    });
  }
};


export const updateDiSan = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { tieu_de_vi,
      tieu_de_en,
      slug,
      tom_tat_vi,
      tom_tat_en,
      noi_dung_vi,
      noi_dung_en,
      hinh_anh,
    danh_muc_id } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "id ko ton tai!",
      });
    }
    const disan = await DiSan.findByPk(id);
    if (!disan) {
      return res.status(404).json({
        message: "di sản ko ton tai",
      });
    }
    await disan.update({
      tieu_de_vi,
      tieu_de_en,
      slug,
      tom_tat_vi,
      tom_tat_en,
      noi_dung_vi,
      noi_dung_en,
      hinh_anh,
      danh_muc_id
    });

    return res.status(200).json({
      message: "Cập nhật di sản thành công",
      disan,
    });
  } catch (e) {
    console.error("Lỗi update di sản:", e);
    res.status(500).json({
      message: "Loi sever update",
    });
  }
};

export const getDiSanById = async (req, res) => {
  try {
    const { id } = req.params;
    const disan = await DiSan.findByPk(id);
    if (!disan) {
      return res.status(404).json({
        message: "di sản ko ton tai!",
      });
    }
    return res.status(200).json({ disan });
  } catch (e) {
    console.error("Lỗi khi lấy di sản: ", e);
    res.status(500).json({
      message: "Error server",
    });
  }
};