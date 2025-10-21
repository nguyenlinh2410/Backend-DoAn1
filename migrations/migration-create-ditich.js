export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("di_tich", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    tieu_de_vi: Sequelize.STRING,
    tieu_de_en: Sequelize.STRING,
    slug: Sequelize.STRING,
    tom_tat_vi: Sequelize.TEXT,
    tom_tat_en: Sequelize.TEXT,
    noi_dung_vi: Sequelize.TEXT,
    noi_dung_en: Sequelize.TEXT,
    hinh_anh: Sequelize.STRING,
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("di_tich");
}
