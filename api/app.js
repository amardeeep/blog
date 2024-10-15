const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.get("/", (req, res) => {
  res.send("Serving You!");
});
app.listen(process.env.PORT, () => {
  "Listening On Port 3000";
});
