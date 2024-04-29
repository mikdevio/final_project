import fs from "fs";
import path from "path";

import Sale from "../models/sale.model.js";
import Bill from "../models/bill.model.js";
import User from "../models/user.model.js";
import * as report from "../utils/report.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Customer from "../models/customer.model.js";

import { dataEmptyFromModel, dataFilledFromModel } from "../utils/func.js";
import { __layout_dashboard } from "../settings.js";

export const callPos = async (req, res) => {

  const productList = await Product.find({});
  const categoryList = await Category.find({});
  const customerList = await Customer.find({});

  res.render("partials/pos.ejs", {
    products: productList,
    categories: categoryList,
    customers: customerList,
    layout: __layout_dashboard,
  });
};

export const getAll = async (req, res) => {
  const salesList = await Sale.find({});
  res.render("partials/table.ejs", {
    data: salesList,
    table_title: "Sales",
    model: "sale",
    layout: __layout_dashboard,
  });
};

export const editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Sale.findById(id).exec();
  let fields = dataFilledFromModel(Sale, data);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "sale",
    layout: __layout_dashboard,
  });
};

export const newItem = (req, res) => {
  let fields = dataEmptyFromModel(Sale);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "sale",
    layout: __layout_dashboard,
  });
};

export const createItem = async (req, res) => {
  const newSale = new Sale({
    customer: req.body.customer,
    products: req.body.products,
    totalAmount: req.body.totalAmount,
    subTotal: req.body.subTotal,
    discountAmount: req.body.discountAmount,
    taxAmount: req.body.taxAmount
  });

  try {
    const result = await newSale.save();
    res.redirect("/sale/all");
  } catch (err) {
    console.log(err);
  }
};

export const createFromPos = async(req, res) => {

  console.log(req.body.data);

  const newSale = new Sale({
    customer: req.body.data.customer,
    products: req.body.data.products,
    totalAmount: req.body.data.totalAmount,
    subTotal: req.body.data.subTotal,
    discountAmount: req.body.data.discountAmount,
    taxAmount: req.body.data.taxAmount,
    payWith: req.body.data.payWith,
    payChange: req.body.data.payChange,
  });

  console.log(newSale);

  const Manager = User.findOne({role:"Manager"});
  
  const newBill = new Bill({
    sale: newSale._id,
    userId: Manager._id,
    paymentMethod: req.body.paymentMode
  });

  try {
    // Update products quantity
    newSale.products.forEach(async product => {
      await Product.findByIdAndUpdate(
        {_id: product._id}, 
        {$inc: {'quantity': -product.quantity}}
      )
    });

    await newSale.save();
    await newBill.save();
    res.json({success: true});
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = async (req, res) => {
  const saleId = req.params.id;

  try {
    await Product.findOneAndUpdate(
      { _id: saleId },
      {
        customer: req.body.customer,
        products: [],
        totalAmount: req.body.totalAmount,
      }
    );
    res.redirect("/sale/all");
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (req, res) => {
  const saleId = req.params.id;
  try {
    await Product.findOneAndDelete({ _id: saleId });
    res.redirect("/sale/all");
  } catch (error) {
    console.log(error);
  }
};

export const generateReport = async (req, res) => {
  try {
    const saleList = await Sale.find({});

    await report.generateAllReport(saleList, "sale");

    // TODO: Fix path problem for report pdf file
    // // Header file
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=all-sale.pdf');
    // res.setHeader('Content-Length', fs.statSync('all-sale.pdf').size);

    // // File stream
    // const pdfStream = fs.createReadStream('all-sale.pdf');
    // pdfStream.pipe(res);

    res.redirect("/sale/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
  
}