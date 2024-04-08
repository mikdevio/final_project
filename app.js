const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

const env = require("dotenv");

const indexRouter = require("./routers/index.router");

const { initializeDB } = require("./utils/db");


// Set env config vars
env.config();

// Express application
const app = express();

// Connection to MongoDB
main()
  .then(() => {
    console.log("MongoDB connection Successfully");
    //initializeDB();
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

/* App configurations */
// File paths
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/layouts", express.static(path.join(__dirname, "views/layouts")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Express-ejs-layout
app.use(expressLayouts);

// Body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Use of routers
app.use("/", indexRouter);

app.listen(process.env.PORT || "3000", () => {
  console.log(`App ready on port ${process.env.PORT}`);
});
