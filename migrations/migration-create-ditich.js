export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('di_tich', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    tieu_de_vi: Sequelize.STRING,
    tieu_de_en: Sequelize.STRING,
    slug: Sequelize.STRING,
    tom_tat: Sequelize.TEXT,
    noi_dung: Sequelize.TEXT,
    hinh_anh: Sequelize.STRING,
    ngon_ngu_id: {
      type: Sequelize.INTEGER,
      references: { model: 'ngon_ngu', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('di_tich');
}