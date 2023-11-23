/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex("teams").truncate();

    // Inserts seed entries
    await knex("teams").insert([
      { team_name: "Jets", city: "New York" },
      { team_name: "Ravens", city: "Baltimore" },
      { team_name: "Bengals", city: "Cincinnati" },
    ]);
  } catch (error) {
    console.error(`Error seeding data: ${error}`);
  }
};
