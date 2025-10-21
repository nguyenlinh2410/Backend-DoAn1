import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class DiTich extends Model {
  static associate(models) {
    DiTich.belongsTo(models.NgonNgu, { foreignKey: "ngon_ngu_id" });
  }
}

DiTich.init(
  {
    tieu_de_vi: DataTypes.STRING,
    tieu_de_en: DataTypes.STRING,
    slug: DataTypes.STRING,
    tom_tat_vi: DataTypes.TEXT,
    tom_tat_en: DataTypes.TEXT,
    noi_dung_vi: DataTypes.TEXT,
    noi_dung_en: DataTypes.TEXT,
    hinh_anh: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "DiTich",
    tableName: "di_tich",
  }
);

export default DiTich;
