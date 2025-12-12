import TuyenThamQuan from "../../models/tuyenthamquan.js";
export const createTuyen = async (req, res) => {
  try {
    const { ten_tuyen_vi, ten_tuyen_en, gia_nguoi_lon, gia_tre_em } = req.body;
    let hinh_anh = null;
    if (req.file) {
      hinh_anh = req.file.buffer;
    }

    const tuyen = await TuyenThamQuan.create({
      ten_tuyen_vi,
      ten_tuyen_en,
      gia_nguoi_lon,
      gia_tre_em,
      hinh_anh,
    });

    res.json({
      message: "Tuyen created successfully",
      tuyen,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    console.log(e);
  }
};

export const getAllTuyen = async (req, res) => {
  try {
    const tuyen = await TuyenThamQuan.findAll({
      attributes: { exclude: ["hinh_anh"] },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(tuyen);
  } catch (e) {
    console.error("Lỗi lấy danh sách tuyen:", e);
    res.status(500).json({
      message: "Loi sever ko lay dc ds",
    });
  }
};

export const getImage = async (req, res) => {
  try {
    const tuyen = await TuyenThamQuan.findByPk(req.params.id);
    if (!tuyen || !tuyen.hinh_anh) return res.status(404).end();
    res.set("Content-Type", "image/jpeg");
    res.send(tuyen.hinh_anh);
  } catch (e) {
    console.error("Lỗi lấy anh:", e);
    res.status(500).json({
      message: "Loi sever ko lay dc anh",
    });
  }
};

export const deleteTuyen = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!id) {
      return res.status(200).json({
        message: "id ko ton tai!",
      });
    }
    const tuyen = await TuyenThamQuan.findByPk(id);
    if (!tuyen) {
      return res.status(404).json({
        message: "tuyen ko ton tai",
      });
    }
    await TuyenThamQuan.destroy({ where: { id } });
    res.status(200).json({
      message: " delete tuyen sucessfull",
    });
  } catch (e) {
    console.error("Loi khi xoa", e);
    res.status(500).json({
      message: "error Server",
    });
  }
};

export const getTuyenById = async (req, res) => {
  try {
    const { id } = req.params;
    const tuyen = await TuyenThamQuan.findByPk(id, {
      attributes: { exclude: ["hinh_anh"] },
    });
    if (!tuyen) {
      return res.status(404).json({
        message: "tuyen ko ton tai!",
      });
    }
    return res.status(200).json({ tuyen });
  } catch (e) {
    console.error("Lỗi khi lấy tuyen: ", e);
    res.status(500).json({
      message: "Error server",
    });
  }
};

export const updateTuyen = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const tuyen = await TuyenThamQuan.findByPk(id);

    if (!tuyen) {
      return res.status(404).json({ message: "Tuyến không tồn tại" });
    }

    const { ten_tuyen_vi, ten_tuyen_en, gia_nguoi_lon, gia_tre_em } = req.body;

    const updateData = {
      ten_tuyen_vi,
      ten_tuyen_en,
      gia_nguoi_lon,
      gia_tre_em,
    };

    if (req.file) {
      updateData.hinh_anh = req.file.buffer;
    }

    await tuyen.update(updateData);

    res.status(200).json({
      message: "Cập nhật tuyến thành công",
      data: tuyen,
    });
  } catch (err) {
    console.error("Lỗi update tuyến:", err);
    res.status(500).json({ message: "Lỗi server update tuyến" });
  }
};
