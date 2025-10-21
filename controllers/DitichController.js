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
      hinh_anh
    } = req.body;
    
    const newDiTich = await DiTich.create({
      tieu_de_vi,
      tieu_de_en,
      slug,
      tom_tat_vi,
      tom_tat_en,
      noi_dung_vi,
      noi_dung_en,
      hinh_anh
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
