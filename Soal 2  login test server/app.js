require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const router = require("./router/router");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());


app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
