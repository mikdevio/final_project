/* app.js main App file */
import path from "path";
import env from "dotenv";
import express from "express";

import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";

import * as settings from "./settings.js";
import { initializeDB, mongoDBConnection } from "./utils/db.js";

import indexRouter from "./routers/index.router.js";

// Set env config vars
env.config();

// Express application
const app = express();

// Connection to MongoDB
mongoDBConnection()
  .then(() => {
    console.log("MongoDB connection Successfully");
    // initializeDB();
  })
  .catch((err) => console.log(err));

/* App configurations */
// File paths
app.use("/public", express.static(path.join(settings.__dirname, "public")));
app.use("/layouts", express.static(path.join(settings.__dirname, "views/layouts")));
app.set("views", path.join(settings.__dirname, "views"));
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

app.listen(settings.PORT || "3000", () => {
  console.log(`App ready on http://localhost:${process.env.PORT}`);
});
