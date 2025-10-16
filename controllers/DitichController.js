import bcrypt from "bcrypt";
import DiTich from '../models/ditich.js'

export const createDiTich = async (req, res) => {
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