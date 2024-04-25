import fs from "fs";
import path from "path";
import express from "express";

import * as report from "../utils/report.js";
import Product from "../models/product.model.js";
import { dataEmptyFromModel, dataFilledFromModel } from "../utils/func.js";

import { __layout_dashboard } from "../settings.js";

export const getAll = async (req, res) => {
  const productsList = await Product.find({});
  res.render("partials/table.ejs", {
    data: productsList,
    table_title: "Products",
    model: "product",
    layout: __layout_dashboard,
  });
};

export const editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Product.findById(id).exec();
  let fields = dataFilledFromModel(Product, data);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "product",
    layout: __layout_dashboard,
  });
};

export const newItem = (req, res) => {
  let fields = dataEmptyFromModel(Product);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "product",
    layout: __layout_dashboard,
  });
};

export const createItem = async (req, res) => {
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

export const updateItem = async (req, res) => {
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

export const deleteItem = async (req, res) => {
  const productId = req.params.id;
  try {
    await Product.findOneAndDelete({ _id: productId });
    res.redirect("/product/all");
  } catch (error) {
    console.log(error);
  }
};

export const generateReport = async (req, res) => {
  try {
    const productsList = await Product.find({});

    const file_url = await report.generateAllReport(productsList, "product");

    // let stream = fs.createReadStream(file_url);
    // let filename = path.basename(file_url);
    // res.setHeader("Content-disposition", "inline; filename='"+filename+"'");
    // res.setHeader("Content-type", "application/pdf");
    // // stream.pipe(res);

    res.redirect("/product/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
  
}