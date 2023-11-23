const db = require("../../data/dbConfig.js");

function getAll() {
  return db("teams");
}

async function insert(team) {
  return await db("teams")
    .insert(team)
    .then(([id]) => {
      return db("teams").where("id", id).first();
    });
}

function getById(id) {
  return db("teams as t").select("t.*").where("t.id", id).first();
}

function update(id, changes) {
  return db("teams")
    .where("id", id)
    .update(changes)
    .then((count) => (count > 0 ? getById(id) : null));
}

function remove(id) {
  return db("teams").where("id", id).del();
}

module.exports = {
  getAll,
  insert,
  getById,
  update,
  remove,
};
