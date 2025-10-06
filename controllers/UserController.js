import bcrypt from "bcrypt";
import { Users } from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // if (!password) {
    //   return res.status(400).json({ error: "Password is required" });
    // }

    //hash pass
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
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
