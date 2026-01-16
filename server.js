const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front.html");
});

mongoose.connect("mongodb://127.0.0.1:27017/userdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("User", UserSchema);

app.post("/submit", async (req, res) => {
  console.log(req.body);
  const { name, age } = req.body;
  await User.create({ name, age });
  res.send("Data saved");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
