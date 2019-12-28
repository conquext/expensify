const path = require("path");
const express = require("express");

const app = express();
console.log("dirname", __dirname);
console.log(path.join(__dirname, "dist"));
const publicPath = path.join(__dirname, "dist");

const fs = require("fs");

fs.readdir(publicPath, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});

const { PORT = 30001 } = process.env;

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "/index.html"));
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
