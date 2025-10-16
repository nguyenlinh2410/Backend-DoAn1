export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('danh_muc_disan', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    ten_danh_muc_vi: { type: Sequelize.STRING, allowNull: false },
    ten_danh_muc_en: { type: Sequelize.STRING, allowNull: false },
    slug: { type: Sequelize.STRING, allowNull: false, unique: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('danh_muc_disan');
}