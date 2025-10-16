import bcrypt from "bcrypt";
import Admin from "../models/admin.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // if (!password) {
    //   return res.status(400).json({ error: "Password is required" });
    // }

    //hash pass
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "User created successfully",
      user,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    console.log(e);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Admin.findAll();
    res.status(200).json(users);
  } catch (e) {
    console.error("Lỗi lấy danh sách user:", e);
    res.status(500).json({
      message: "Loi sever ko lay dc ds",
    });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!id) {
      return res.status(200).json({
        message: "id ko ton tai!",
      });
    }
    const user = await Admin.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "user ko ton tai",
      });
    }
    await Admin.destroy({ where: { id } });
    res.status(200).json({
      message: " delete user sucessfull",
    });
  } catch (e) {
    console.error("Loi khi xoa", e);
    res.status(500).json({
      message: "error Server",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "id ko ton tai!",
      });
    }
    const user = await Admin.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "user ko ton tai",
      });
    }
    await user.update({
      name,
      email,
    });

    return res.status(200).json({
      message: "Cập nhật user thành công",
      user,
    });
  } catch (e) {
    console.error("Lỗi update user:", e);
    res.status(500).json({
      message: "Loi sever update",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Admin.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "user ko ton tai!",
      });
    }
    return res.status(200).json({ user });
  } catch (e) {
    console.error("Lỗi khi lấy user: ", e);
    res.status(500).json({
      message: "Error server",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: "Email không tồn tại" });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    res.json({
      message: "Login successful",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
