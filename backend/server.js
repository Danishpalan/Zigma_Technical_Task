const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/employeeDB")
  .then(() => console.log("MongoDB Connected (Local)"))
  .catch(err => console.log(err));


// Schema
const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
});

const Employee = mongoose.model("Employee", EmployeeSchema);

// Routes
app.post("/employees", async (req, res) => {
  const emp = await Employee.create(req.body);
  res.json(emp);
});

app.get("/employees", async (req, res) => {
  const data = await Employee.find();
  res.json(data);
});

app.put("/employees/:id", async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));