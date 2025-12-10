export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("ve_tham_quan", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ma_ve: { type: Sequelize.STRING(20), allowNull: false, unique: true },
    ho_ten_khach: { type: Sequelize.STRING, allowNull: false },
    sdt: { type: Sequelize.STRING(15), allowNull: false },
    email: { type: Sequelize.STRING, allowNull: true },
    so_nguoi_lon: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    so_tre_em: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    tong_tien: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    ngay_dat: { type: Sequelize.DATEONLY, allowNull: false },
    tuyen_tham_quan_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "tuyen_tham_quan", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    trang_thai: {
      type: Sequelize.ENUM("cho_xac_nhan", "da_xac_nhan", "da_huy"),
      allowNull: false,
      defaultValue: "cho_xac_nhan",
    },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("ve_tham_quan");
}
