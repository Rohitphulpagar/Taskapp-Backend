const mongoose = require("mongoose");

const taskDetails = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
});

const taskSchema = mongoose.model("taskSchema", taskDetails);
module.exports = taskSchema;
