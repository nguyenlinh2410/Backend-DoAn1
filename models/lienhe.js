import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class LienHe extends Model {
  static associate(models) {
  }
}

LienHe.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "LienHe",
    tableName: "lien_he",
  }
);

export default LienHe;
