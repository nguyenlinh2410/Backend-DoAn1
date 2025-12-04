export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("tuyen_tham_quan", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    ten_tuyen_vi: { type: Sequelize.STRING, allowNull: false },
    ten_tuyen_en: { type: Sequelize.STRING, allowNull: true },
    gia_nguoi_lon: {
      type: Sequelize.INTEGER,
      allowNull: false,
      DefaultValue: 0,
    },
    gia_tre_em: { type: Sequelize.INTEGER, allowNull: false, DefaultValue: 0 },
    hinh_anh: { type: Sequelize.BLOB("long"), allowNull: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("tuyen_tham_quan");
}
