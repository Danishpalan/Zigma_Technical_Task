const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// GET all employees
router.get("/", async (req, res) => {
  try {
    const data = await Employee.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD employee
router.post("/", async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE employee
router.put("/:id", async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
