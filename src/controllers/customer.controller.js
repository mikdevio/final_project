import path from "path";

import * as report from "../utils/report.js";
import Customer from "../models/customer.model.js";
import { dataEmptyFromModel, dataFilledFromModel } from "../utils/func.js";

import { __layout_dashboard } from "../settings.js";

export const getAll = async (req, res) => {
  const customerList = await Customer.find({});
  res.render("partials/table.ejs", {
    data: customerList,
    table_title: "Customer",
    model: "customer",
    layout: __layout_dashboard,
  });
};

export const editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Customer.findById(id).exec();
  let fields = dataFilledFromModel(Customer, data);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "customer",
    layout: __layout_dashboard,
  });
};

export const newItem = (req, res) => {
  let fields = dataEmptyFromModel(Customer);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "customer",
    layout: __layout_dashboard,
  });
};

export const createItem = async (req, res) => {

  // TODO: Check functionality upload middleware <Customer>
  const newCustomer = new Customer({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    tax_number: req.body.tax_number,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    img: { 
      data: fs.readFileSync(path.join(settings.__dirname, "uploads/customer", req.body["img.data"])),
      contentType: "image/png",
    },
  });

  try {
    const result = await newCustomer.save();
    res.redirect("/customer/all");
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = async (req, res) => {
  const customerId = req.params.id;
  try {
    await Customer.findOneAndUpdate(
      { _id: customerId },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        tax_number: req.body.tax_number,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      }
    );
    res.redirect("/customer/all");
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (req, res) => {
  const customerId = req.params.id;
  try {
    await Customer.findOneAndDelete({ _id: customerId });
    res.redirect("/customer/all");
  } catch (error) {
    console.log(error);
  }
};

export const generateReport = async (req, res) => {
  try {
    const customerList = await Customer.find({});

    await report.generateAllReport(customerList, "customer");

    // TODO: Add open pdf file functionality

    res.redirect("/customer/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
  
}