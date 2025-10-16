export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ngon_ngu', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    ma: { type: Sequelize.STRING(10), allowNull: false, unique: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('ngon_ngu');
}