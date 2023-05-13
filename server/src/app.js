const express = require("express");
const cors = require("cors");

const CustomiseResponse = require("./middleware/CustomiseResponse");
require("./db/db");

const { router: authRouter } = require("./routes/auth.routes");
const { router: profileRouter } = require("./routes/profile.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(CustomiseResponse);

const PORT = process.env.PORT || 4000;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
