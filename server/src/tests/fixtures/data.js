const { DeleteUsers, InsertUser } = require("../../db/query");
const { addRecruiterDefault } = require("../../db/db");
const bcrypt = require("bcrypt");

const DEFAULT_USER_1 = {
  username: "Mike",
  email: "mike@example.com",
  password: "56?!!",
};

const DEFAULT_USER_2 = {
  username: "testName",
  email: "test1@email.com",
  password: "testPassword",
};

const DEFAULT_USER_3 = {
  username: "testName01",
  email: "test11@email.com",
  password: "testPassword11",
};

const setUpDatabase = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const resp = await DeleteUsers();
  if (resp) {
    const { token } = await InsertUser({
      ...user,
      password: hashedPassword,
    });
    if (token) return token;
    return "";
  }
};

const insertRecruiter = async () => {
  await addRecruiterDefault();
};

module.exports = {
  DEFAULT_USER_1,
  DEFAULT_USER_2,
  DEFAULT_USER_3,
  setUpDatabase,
  insertRecruiter,
};
