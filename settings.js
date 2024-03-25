const path = require("path");

const Settings = {
  LAYOUT_DIR: path.join(__dirname, "/views/layouts"),
  PORT: 3500,
  MONGODB_URL: "mongodb://127.0.0.1:27017/final_project",
};

module.exports = Settings;
