const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

const settings = require("./settings");
const roleRouter = require("./routers/role.router");
const userRouter = require("./routers/user.router");
const indexRouter = require("./routers/index.router");
const productRouter = require("./routers/product.router");
const categoryRouter = require("./routers/category.router");
const customerRouter = require("./routers/customer.router");

// Express application
const app = express();

// Connection to MongoDB
main()
  .then(() => {
    console.log("MongoDB connection Successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(settings.MONGODB_URL);
}

/* App configurations */
// File paths
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/layouts", express.static(path.join(__dirname, "views/layouts")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Express-ejs-layout
app.use(expressLayouts);
app.set("layout", "./layouts/main.ejs");

// Body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Use of routers
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/role", roleRouter);
app.use("/category", categoryRouter);
app.use("/customer", customerRouter);

app.listen(settings.PORT, () => {
  console.log(`App ready on port ${settings.PORT}`);
});
