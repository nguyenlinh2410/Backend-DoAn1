import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class TuyenThamQuan extends Model {
  static associate(models) {
    TuyenThamQuan.hasMany(models.VeThamQuan, {
      foreignKey: "tuyen_tham_quan_id",
      as: "ve_tham_quans",
    });
  }
}

TuyenThamQuan.init(
  {
    ten_tuyen_vi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Ten tuyen khong duoc de trong",
        },
      },
    },
    ten_tuyen_en: { type: DataTypes.STRING, allowNull: true },
    gia_nguoi_lon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "gia nguoi lon phai lon hon hoac bang 0",
        },
      },
    },
    gia_tre_em: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "gia tre em phai lon hon hoac bang 0",
        },
      },
    },
    hinh_anh: { type: DataTypes.BLOB("long"), allowNull: true },
  },
  {
    sequelize,
    modelName: "TuyenThamQuan",
    tableName: "tuyen_tham_quan",
  }
);

export default TuyenThamQuan;
