import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME, // tên database trong XAMPP (thay bằng tên DB thật)
  process.env.DB_USER, // user MySQL (mặc định của XAMPP)
  process.env.DB_PASS, // password (null nếu không đặt)
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// Thử kết nối để kiểm tra:
try {
  await sequelize.authenticate();
  console.log("✅ Connected to MySQL successfully!");
} catch (error) {
  console.error("❌ Unable to connect to the database:", error);
}
