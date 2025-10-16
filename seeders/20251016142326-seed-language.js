"use strict";

export async function up(queryInterface) {
  await queryInterface.bulkInsert("ngon_ngu", [
    { ma: "vi", createdAt: new Date(), updatedAt: new Date() },
    { ma: "en", createdAt: new Date(), updatedAt: new Date() },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("ngon_ngu", null, {});
}
