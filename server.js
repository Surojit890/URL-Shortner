const express = require("express");
const { connectTomongoDB } = require("./connect");
const app = express();
const PORT = 8000;
const URLRoute = require("./routes/url.router");
const URL = require("./models/url");

app.use(express.json());

connectTomongoDB("mongodb://127.0.0.1:27017/short-URl").then(() => {
  console.log("Connected to MongoDB");
});

app.use("/url", URLRoute);

// Fixing route and update logic
app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  
  try {
    const Entry = await URL.findOneAndUpdate(
      { shortID },
      { $push: { visitHistory: { timeStamp: Date.now() } } },
      { new: true }
    );

    if (!Entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    res.redirect(Entry.redirectURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
