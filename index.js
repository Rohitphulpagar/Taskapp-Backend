const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const user = require("./Route/user");
const task = require("./Route/taskRoute");
const cors = require("cors");
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/Active", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.use("/user", user);
app.use("/user", task);

PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});
