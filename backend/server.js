const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "dockerlab-backend"
  });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Backend running on port 3000");
});