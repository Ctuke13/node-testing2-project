const Teams = require("./teams-model");
const db = require("../../data/dbConfig");
const request = require("supertest");
const server = require("../server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

describe("[GET] /teams", () => {
  test("responds with 200 ok", async () => {
    const res = await request(server).get("/api/teams");
    expect(res.status).toBe(200);
  });
  test("responds with all teams ", async () => {
    const res = await request(server).get("/api/teams");
    expect(res.body).toHaveLength(3);
  });
});

describe("getById", () => {
  test("resolves the team by the given id", async () => {
    let result = await Teams.getById(1);
    expect(result).toMatchObject({ team_name: "Jets", city: "New York" });
    result = await Teams.getById(2);
    expect(result).toMatchObject({ team_name: "Ravens", city: "Baltimore" });
    result = await Teams.getById(3);
    expect(result).toMatchObject({ team_name: "Bengals", city: "Cincinnati" });
  });
});

describe("[POST] /teams/:id", () => {
  const giants = { team_name: "Giants", city: "New York" };
  test("resolves the newly created team", async () => {
    const result = await Teams.insert(giants);
    expect(result).toMatchObject(giants);
  });
  test("adds the team to the teams table", async () => {
    const teams = await db("teams");
    expect(teams).toHaveLength(4);
  });
});

describe("[PUT] /teams/:id", () => {
  test("responds with updated project", async () => {
    let changes = { team_name: "Jets", city: "East Rutherford" };
    let results = await Teams.update(1, changes);
    console.log(results);
    expect(results).toMatchObject(changes);
  });
});

describe("[DELETE] /teams/:id", () => {
  test("deletes the team with the given id", async () => {
    await Teams.remove(3);
    let res = await Teams.getById(3);
    console.log(res);
    expect(res).toBe(undefined);
  });
});
