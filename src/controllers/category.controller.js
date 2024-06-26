import path from "path";

import * as report from "../utils/report.js";
import Category from "../models/category.model.js";
import { dataEmptyFromModel, dataFilledFromModel } from "../utils/func.js";

import { __layout_dashboard } from "../settings.js";

export const getAll = async (req, res) => {
  const categoriesList = await Category.find({});
  res.render("partials/table.ejs", {
    data: categoriesList,
    table_title: "Categories",
    model: "category",
    layout: __layout_dashboard,
  });
};

export const editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Category.findById(id).exec();
  let fields = dataFilledFromModel(Category, data);
  // console.log(fields);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "category",
    layout: __layout_dashboard,
  });
};

export const newItem = (req, res) => {
  let fields = dataEmptyFromModel(Category);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "category",
    layout: __layout_dashboard,
  });
};

export const createItem = async (req, res) => {
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

export const updateItem = async (req, res) => {
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

export const deleteItem = async (req, res) => {
  const categoryId = req.params.id;
  try {
    await Category.findOneAndDelete({ _id: categoryId });
    res.redirect("/category/all");
  } catch (error) {
    console.log(error);
  }
};

export const generateReport = async (req, res) => {
  try {
    const categoryList = await Category.find({});

    await report.generateAllReport(categoryList, "category");

    // TODO: Add open pdf file functionality

    res.redirect("/user/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
}
