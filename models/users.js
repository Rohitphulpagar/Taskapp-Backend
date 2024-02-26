const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const userSchema = mongoose.model("userSchema", user);
module.exports = userSchema;
