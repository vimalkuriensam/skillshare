const { DATA } = require("./data");

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
    const res = await pool.query(DATA.CREATE_USER_TABLE);
    if (res?.command) console.log("USER TABLE CREATED OR ALREADY EXIST");
  } catch (e) {
    console.log(e.message);
    await pool.end();
  }
};

createTables();

module.exports = { pool };
