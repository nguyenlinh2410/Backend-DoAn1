import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class VeThamQuan extends Model {
    static associate(models) {
    VeThamQuan.belongsTo(models.TuyenThamQuan, { foreignKey: "tuyen_tham_quan_id" ,as:'tuyen_tham_quan'});
  }

  //phuong thuc tao ma ve tu dong
  static generateMaVe() {
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `TA${timestamp}${random}`;
    }
  
}

VeThamQuan.init(
  {
    ma_ve:{
        type:DataTypes.STRING(20),
        allowNull:false,
        unique:{
            msg:'ma ve da ton tai'
        }
    },
    ho_ten_khach:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg:'ho ten khong duoc de trong'
            }
        }
    },
    sdt:{
        type:DataTypes.STRING(15),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'so dien thoai khong duoc de trong'
            },
            isNumeric:{
                msg:'so dien thoai chi duoc chua so'
            }
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
        validate:{
            isEmail:{
                msg:'Emaill khong hop le'
            }
        }
    },
    so_nguoi_lon:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,
        validate:{
            min:{
                args:[0],
                msg:'so nguoi lon phai lon hon hoac bang 0'
            }
        }
    },
    so_tre_em:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,
        validate:{
            min:{
                args:[0],
                msg:'so tre em phai lon hon hoac bang 0'
            }
        }
    },
   tong_tien:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0,
        
    },
    ngay_dat:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        validate:{
            isDate:{
                msg:'ngay dat khong hop le'
            }
        }
    },
    tuyen_tham_quan_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                msg:'phai chon tuyen tham quan'
            }
        }
    },
    trang_thai:{
        type:DataTypes.ENUM('cho_xac_nhan','da_xac_nhan','da_huy'),
        allowNull:false,
        defaultValue:'cho_xac_nhan'
    }
    
  },
  {
    sequelize,
    modelName: "VeThamQuan",
    tableName: "ve_tham_quan",
  }
);

export default VeThamQuan;
