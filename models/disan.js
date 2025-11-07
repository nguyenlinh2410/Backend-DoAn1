import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class DiSan extends Model {
  static associate(models) {
    DiSan.belongsTo(models.DanhMucDiSan, { foreignKey: "danh_muc_id" });
  }
}

DiSan.init(
  {
    tieu_de_vi: DataTypes.STRING,
    tieu_de_en: DataTypes.STRING,
    slug: DataTypes.STRING,
    tom_tat_vi: DataTypes.TEXT,
    tom_tat_en: DataTypes.TEXT,
    noi_dung_vi: DataTypes.TEXT,
    noi_dung_en: DataTypes.TEXT,
    hinh_anh: DataTypes.STRING,
    danh_muc_id: {
      type: DataTypes.INTEGER,
      references: { model: "danh_muc_disan", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "DiSan",
    tableName: "di_san",
  }
);

export default DiSan;
