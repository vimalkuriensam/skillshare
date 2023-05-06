const express = require("express");
const Pool = require("pg").Pool;

const { router: authRouter } = require("./routes/auth.routes");

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const PORT = process.env.PORT || 4000;

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
