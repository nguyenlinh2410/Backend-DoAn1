import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/db.js";

export default (sequelize) => {
  class DiSan extends Model {
    static associate(models) {
      DiSan.belongsTo(models.NgonNgu, { foreignKey: 'ngon_ngu_id' });
      DiSan.belongsTo(models.DanhMucDiSan, { foreignKey: 'danh_muc_id' });
    }
  }

  DiSan.init(
    {
      tieu_de_vi: DataTypes.STRING,
      tieu_de_en: DataTypes.STRING,
      slug: DataTypes.STRING,
      tom_tat: DataTypes.TEXT,
      noi_dung: DataTypes.TEXT,
      hinh_anh: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'DiSan',
      tableName: 'di_san'
    }
  );

  return DiSan;
};