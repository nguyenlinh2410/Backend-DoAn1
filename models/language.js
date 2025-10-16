import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export default (sequelize) => {
  class NgonNgu extends Model {
    static associate(models) {
      NgonNgu.hasMany(models.DiTich, { foreignKey: "ngon_ngu_id" });
      NgonNgu.hasMany(models.DiSan, { foreignKey: "ngon_ngu_id" });
    }
  }

  NgonNgu.init(
    {
      ma: { type: DataTypes.STRING(10), allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "NgonNgu",
      tableName: "ngon_ngu",
    }
  );

  return NgonNgu;
};
