const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const { DeleteUsers, InsertUser } = require("../db/query");
const {
  DEFAULT_USER_1,
  DEFAULT_USER_2,
  setUpDatabase,
} = require("./fixtures/data");

let jwtToken = "";

beforeEach(async () => {
  const token = await setUpDatabase(DEFAULT_USER_1);
  jwtToken = token;
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/api/v1/auth/signup")
    .send({ ...DEFAULT_USER_2 })
    .expect(201);
});

test("Signed in user should return token in response", async () => {
  const resp = await request(app)
    .post("/api/v1/auth/signup")
    .send(DEFAULT_USER_2);
  expect(resp.body.data.token).toEqual(expect.any(String));
});

test("Should login an existing user", async () => {
  const testData = { username: "Mike", password: "56?!!" };
  await request(app).post("/api/v1/auth/login").send(testData).expect(200);
});

test("Logged in user should not return password in response", async () => {
  const testData = { username: "Mike", password: "56?!!" };
  const resp = await request(app).post("/api/v1/auth/login").send(testData);
  expect(resp.body.data.user).not.toHaveProperty("password");
});

test("Logged in user should return token in response", async () => {
  const testData = { username: "Mike", password: "56?!!" };
  const resp = await request(app).post("/api/v1/auth/login").send(testData);
  expect(resp.body.data.token).toEqual(expect.any(String));
});

test("Should not login a non existent user with incorrect username", async () => {
  const testData = {
    username: "testName01",
    password: "testPassword",
  };
  await request(app).post("/api/v1/auth/login").send(testData).expect(400);
});

test("Should not login a non existent user with incorrect password", async () => {
  const testData = {
    username: "testName",
    password: "testPassword01",
  };
  await request(app).post("/api/v1/auth/login").send(testData).expect(400);
});

test("Should not login a non existent user with incorrect username and password", async () => {
  const testData = {
    username: "testName01",
    password: "testPassword01",
  };
  await request(app).post("/api/v1/auth/login").send(testData).expect(400);
});

test("Should delete an authenticated user", async () => {
  const response = await request(app)
    .delete("/api/v1/auth/destroyUser")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send()
    .expect(200);
  expect(response.body.data.message).toBe("USER DELETED");
});

test("Should not delete an unauthenticated user", async () => {
  await request(app).delete("/api/v1/auth/destroyUser").send().expect(401);
});
