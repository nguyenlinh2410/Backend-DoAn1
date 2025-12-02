import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer"
import { fileURLToPath } from "url";
import UserRoutes from "./src/routes/UserRoutes.js";
import DitichRoutes from "./src/routes/DitichRoutes.js";
import DisanRoute from "./src/routes/DisanRoute.js"
// Tạo app Express
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares:
// Cho phép React frontend gọi API mà không bị lỗi CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //cho phep gui cookie, header auth
  })
);

// Cho phép đọc dữ liệu JSON trong request body (req.body)
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({limit:"100mb", extended: true }));
app.use(express.static("public"));

// API routes
app.use("/", UserRoutes);
app.use("/api/ditich", DitichRoutes);
app.use("/api/disan", DisanRoute);

// Cấu hình view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Server giao diện test
// app.get("/", (req, res) => {
//   res.render("index");
// });

// 🔥 Start server
app.listen(PORT, () => {
  console.log(`Server running PORT ${PORT}`);
});
