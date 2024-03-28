const path = require("path");
const express = require("express");

const Product = require("../models/product.model");
const { dataEmptyFromModel, dataFilledFromModel } = require("../utils/func");

exports.getAll = async (req, res) => {
  const productsList = await Product.find({});
  res.render("partials/table.ejs", {
    data: productsList,
    table_title: "Products",
    model: "product",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Product.findById(id).exec();
  let fields = dataFilledFromModel(Product, data);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "product",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.newItem = (req, res) => {
  let fields = dataEmptyFromModel(Product);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "product",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.createItem = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    cost: req.body.cost,
    tax: req.body.tax,
    discount: req.body.discount,
    description: req.body.description,
    quantity: req.body.quantity,
  });

  try {
    const result = await newProduct.save();
    res.redirect("/product/all");
  } catch (err) {
    console.log(err);
  }
};

exports.updateItem = async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.findOneAndUpdate(
      { _id: productId },
      {
        name: req.body.name,
        price: req.body.price,
        cost: req.body.cost,
        tax: req.body.tax,
        discount: req.body.discount,
        description: req.body.description,
        quantity: req.body.quantity,
      }
    );
    res.redirect("/product/all");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteItem = async (req, res) => {
  const productId = req.params.id;
  try {
    await Product.findOneAndDelete({ _id: productId });
    res.redirect("/product/all");
  } catch (error) {
    console.log(error);
  }
};
