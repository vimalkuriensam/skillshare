const express = require("express");
require("./db/db");

const { router: authRouter } = require("./routes/auth.routes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
