require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const app = express();

app.use(cors());
app.use("/images", express.static("./images"));
app.use(express.json());

const route = require("./routes.js/route");
app.use("/", route);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
