const request = require("supertest");
const app = require("../app");

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
