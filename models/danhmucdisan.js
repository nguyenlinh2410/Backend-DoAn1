import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

  class DanhMucDiSan extends Model {
    static associate(models) {
      DanhMucDiSan.hasMany(models.DiSan, { foreignKey: "danh_muc_id" });
    }
  }

  DanhMucDiSan.init(
    {
      ten_danh_muc_vi: { type: DataTypes.STRING, allowNull: false },
      ten_danh_muc_en: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "DanhMucDiSan",
      tableName: "danh_muc_disan",
    }
  );

  export default DanhMucDiSan;

