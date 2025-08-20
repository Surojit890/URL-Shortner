const express = require("express");
const path = require("path");
const { connectTomongoDB } = require("./connect");
const URLRoute = require("./routes/url.router");
const URL = require("./models/url");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
connectTomongoDB("mongodb://127.0.0.1:27017/short-URl")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/url", URLRoute);

// Redirect Handler for Short URLs
app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortID },
      { $push: { visitedHistory: { timeStamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("<h2>URL not found</h2>");
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Redirect error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
