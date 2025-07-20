// server/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Load environment variables
require("dotenv").config();

const db = require("./db");

app.use(cors());
app.use(express.json());

// Home route to test DB connection
app.get("/", async (req, res) => {
  try {
    console.log("📡 Incoming GET / request");
    console.log("🔐 MYSQL_URL =", process.env.MYSQL_URL);

    if (!db || typeof db.query !== "function") {
      throw new Error("❌ Database connection (db) is not initialized.");
    }

    const [rows] = await db.query("SELECT NOW()");
    console.log("✅ SQL Query Result:", rows);

    const serverTime = Object.values(rows[0])[0];
    res.json({ message: `Connected! Server time is: ${serverTime}` }); // ✅ Return JSON
  } catch (error) {
    console.error("💥 Error during DB query:", error);
    res
      .status(500)
      .json({ message: "Failed to connect to DB: " + error.message });
  }
});
let backendCounter = 0; // 🧠 This is the in-memory variable that persists as long as server is running

// Route to get the current counter value
app.get("/api/counter", (req, res) => {
  res.json({ counter: backendCounter });
});

// Route to increment the counter
app.post("/api/counter/increment", (req, res) => {
  backendCounter += 1;
  res.json({ counter: backendCounter });
});

// Simple API route
app.get("/api/hello", (req, res) => {
  console.log("📡 Incoming GET /api/hello request");
  res.json({ message: "Hello from backend!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
