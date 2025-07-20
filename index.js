// server/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const db = require("./db");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.send(`Connected! Server time is: ${rows[0].current_time}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to connect to DB: " + error.message);
  }
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
