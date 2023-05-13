const { DATA } = require("./data");
const fs = require("fs/promises");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTables = async () => {
  try {
    console.log("CREATING TABLES...");
    await createCountries();
    await createCities();
    await createUsers();
    await createAddress();
    await insertCountryAndCity();
  } catch (e) {
    console.log(e.message);
    await pool.end();
  }
};

const insertCountryAndCity = async () => {
  try {
    const resp = await fs.readFile("src/db/data/countries.json");
    console.log("resp", JSON.parse(resp));
  } catch (e) {
    console.log(e.message);
  }
};

const createAddress = async () => {
  try {
    const res = await pool.query(DATA.CREATE_ADDRESS_TABLE);
    if (res?.command) {
      console.log("ADDRESS TABLE CREATED OR ALREADY EXIST...");
      return true;
    }
  } catch (e) {
    console.log(e.message);
    throw { message: e.message };
  }
};

const createUsers = async () => {
  try {
    const res = await pool.query(DATA.CREATE_USER_TABLE);
    if (res?.command) {
      console.log("USER TABLE CREATED OR ALREADY EXIST...");
      return true;
    }
  } catch (e) {
    console.log(e.message);
    throw { message: e.message };
  }
};

const createCountries = async () => {
  try {
    const res = await pool.query(DATA.CREATE_TABLE_COUNTRIES);
    if (res?.command) {
      console.log("COUNTRY TABLE CREATED OR ALREADY EXIST...");
      return true;
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

const createCities = async () => {
  try {
    const res = await pool.query(DATA.CREATE_TABLE_CITIES);
    if (res?.command) {
      console.log("CITY TABLE CREATED OR ALREADY EXIST...");
      return true;
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

createTables();

module.exports = { pool };
