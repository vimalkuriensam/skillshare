const request = require("supertest");
const app = require("../app");
const { DEFAULT_USER_3, setUpDatabase } = require("./fixtures/data");

let jwtToken = "";

beforeEach(async () => {
  const token = await setUpDatabase(DEFAULT_USER_3);
  jwtToken = token;
});

test("Should get user info with token provided", async () => {
  const response = await request(app)
    .get("/api/v1/profile/get-all-users")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send()
    .expect(200);

  expect(response.body.data).toHaveProperty("users");
  expect(Array.isArray(response.body.data.users)).toBe(true);
});

test("Should not get user info when no token is provided", async () => {
  await request(app).get("/api/v1/profile/get-all-users").send().expect(401);
});

test("Should get all countries with token provided", async () => {
  const response = await request(app)
    .get("/api/v1/profile/country")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send()
    .expect(200);
  expect(response.body.data).toHaveProperty("countries");
  expect(Array.isArray(response.body.data.countries)).toBe(true);
});

test("Should get all cities with a country id provided", async () => {
  const resp = await request(app)
    .get("/api/v1/profile/country")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send();
  const countryId = resp.body.data.countries[0]["id"];
  const response = await request(app)
    .get(`/api/v1/profile/city/${countryId}`)
    .set("Authorization", `Bearer ${jwtToken}`)
    .send()
    .expect(200);
  expect(response.body.data).toHaveProperty("cities");
  expect(Array.isArray(response.body.data.cities)).toBe(true);
});

test("Should get all skills with token provided", async () => {
  const response = await request(app)
    .get("/api/v1/profile/get-all-skills")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send()
    .expect(200);
  expect(response.body.data).toHaveProperty("skills");
  expect(Array.isArray(response.body.data.skills)).toBe(true);
});

test("Should get all languages with token provided", async () => {
  const response = await request(app)
    .get("/api/v1/profile/get-all-languages")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send()
    .expect(200);
  expect(response.body.data).toHaveProperty("languages");
  expect(Array.isArray(response.body.data.languages)).toBe(true);
});
