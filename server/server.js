const express = require("express");
const app = express();

app.get("/api/v1/civil", (req, res, next) => {
  res.send("Civil management test");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Listing on port 4000");
});
