import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/db.js";

export default (sequelize) => {
  class DiTich extends Model {
    static associate(models) {
      DiTich.belongsTo(models.NgonNgu, { foreignKey: 'ngon_ngu_id' });
    }
  }

  DiTich.init(
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
      modelName: 'DiTich',
      tableName: 'di_tich'
    }
  );

  return DiTich;
};