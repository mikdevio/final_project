
import path from "path";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";

import env from "dotenv";

import indexRouter from "./routers/index.router.js";
import { __dirname } from "./settings.js";
import { initializeDB } from "./utils/db.js";


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
