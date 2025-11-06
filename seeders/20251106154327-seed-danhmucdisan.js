export async function up(queryInterface) {
  await queryInterface.bulkInsert("danh_muc_disan", [
    {
      ten_danh_muc_vi: "Lễ hội",
      ten_danh_muc_en: "Festival",
      slug: "le-hoi",
    },
    {
      ten_danh_muc_vi: "Ẩm thực",
      ten_danh_muc_en: "Cuisine",
      slug: "am-thuc",
    },
    {
      ten_danh_muc_vi: "Làng nghề",
      ten_danh_muc_en: "Craft Village",
      slug: "lang-nghe",
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("danh_muc_disan", null, {});
}