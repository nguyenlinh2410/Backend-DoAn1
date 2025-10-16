import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Admin extends Model {}

Admin.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admin",
  }
);

export default Admin;
