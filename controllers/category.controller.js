const path = require("path");
const express = require("express");

const Category = require("../models/category.model");
const { dataEmptyFromModel, dataFilledFromModel } = require("../utils/func");

const router = express.Router();

router.get("/all", async (req, res) => {
  const categoriesList = await Category.find({});
  res.render("partials/table.ejs", {
    data: categoriesList,
    table_title: "Categories",
    model: "category",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Category.findById(id).exec();
  let fields = dataFilledFromModel(Category, data);
  // console.log(fields);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "category",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
});

router.get("/new", (req, res) => {
  let fields = dataEmptyFromModel(Category);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "category",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
});

router.post("/create", async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const result = await newCategory.save();
    res.redirect("/category/all");
  } catch (err) {
    console.log(err);
  }
});

router.post("/update/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    await Category.findOneAndUpdate(
      { _id: categoryId },
      {
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions,
      }
    );
    res.redirect("/category/all");
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    await Category.findOneAndDelete({ _id: categoryId });
    res.redirect("/category/all");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
