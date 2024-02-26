const express = require("express");
const router = express.Router();
const tasks = require("../models/task");
const verifyAuth = require("../Middleware/verifyAuth");

router.post("/createTask", verifyAuth.checkToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, dueDate } = req.body;
    const createTask = new tasks({
      title,
      description,
      dueDate,
    });
    await createTask.save();
    return res.status(201).json({
      message: "create successufully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.get("/task", verifyAuth.checkToken, async (req, res) => {
  try {
    const task = await tasks.find({});
    return res.status(200).json({
      data: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
router.get("/task/:id", verifyAuth.checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await tasks.findById(id);
    return res.status(200).json({
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
router.put("/task/:id", async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.userId;
    const { id } = req.params;
    const updateTask = await tasks.findByIdAndUpdate(id, {
      title,
      description,
      dueDate,
    });
    return res.status(200).json({
      message: "successufully updated",
      data: updateTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
router.delete("/task/delete/:id", verifyAuth.checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletes = await tasks.findByIdAndDelete(id);
    return res.status(200).json({
      message: "delete successufully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Interrnal server error",
    });
  }
});
module.exports = router;
