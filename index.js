const express = require("express");
const port = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("Initial commit!");
})

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
