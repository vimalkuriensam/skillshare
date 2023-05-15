const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require("../app");
const { DeleteUsers, InsertUser } = require("../db/query");

const userOne = {
  username: "Mike",
  email: "mike@example.com",
  password: "56?!!",
};

let jwtToken = "";

beforeEach(async () => {
  const hashedPassword = await bcrypt.hash(userOne.password, 10);
  const resp = await DeleteUsers();
  if (resp) {
    const { token } = await InsertUser({
      ...userOne,
      password: hashedPassword,
    });
    if (token) jwtToken = token;
  }
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      username: "testName",
      email: "test1@email.com",
      password: "testPassword",
    })
    .expect(201);
});

test("Should login an existing user", async () => {
  const testData = { username: "Mike", password: "56?!!" };
  await request(app).post("/api/v1/auth/login").send(testData).expect(200);
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

test("Should delete an authenticated user", async () => {
  const response = await request(app)
    .delete("/api/v1/auth/destroyUser")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send()
    .expect(200);
  expect(response.body.data.message).toBe("USER DELETED");
});
