const path = require("path");

const Category = require("../models/category.model");
const { dataEmptyFromModel, dataFilledFromModel } = require("../utils/func");

exports.getAll = async (req, res) => {
  const categoriesList = await Category.find({});
  res.render("partials/table.ejs", {
    data: categoriesList,
    table_title: "Categories",
    model: "category",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Category.findById(id).exec();
  let fields = dataFilledFromModel(Category, data);
  // console.log(fields);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "category",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.newItem = (req, res) => {
  let fields = dataEmptyFromModel(Category);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "category",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.createItem = async (req, res) => {
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
};

exports.updateItem = async (req, res) => {
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
};

exports.deleteItem = async (req, res) => {
  const categoryId = req.params.id;
  try {
    await Category.findOneAndDelete({ _id: categoryId });
    res.redirect("/category/all");
  } catch (error) {
    console.log(error);
  }
};
