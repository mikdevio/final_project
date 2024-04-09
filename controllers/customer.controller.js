const fs = require("fs");
const path = require("path");

const report = require("../utils/report");
const Customer = require("../models/customer.model");
const { dataEmptyFromModel, dataFilledFromModel } = require("../utils/func");

exports.getAll = async (req, res) => {
  const customerList = await Customer.find({});
  res.render("partials/table.ejs", {
    data: customerList,
    table_title: "Customer",
    model: "customer",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Customer.findById(id).exec();
  let fields = dataFilledFromModel(Customer, data);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "customer",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.newItem = (req, res) => {
  let fields = dataEmptyFromModel(Customer);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "customer",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.createItem = async (req, res) => {
  const newCustomer = new Customer({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    tax_number: req.body.tax_number,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });

  try {
    const result = await newCustomer.save();
    res.redirect("/customer/all");
  } catch (err) {
    console.log(err);
  }
};

exports.updateItem = async (req, res) => {
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

exports.deleteItem = async (req, res) => {
  const customerId = req.params.id;
  try {
    await Customer.findOneAndDelete({ _id: customerId });
    res.redirect("/customer/all");
  } catch (error) {
    console.log(error);
  }
};

exports.generateReport = async (req, res) => {
  try {
    const customerList = await Customer.find({});

    await report.generateAllReport(customerList, "customer");

    // Header file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=all-customer.pdf');
    res.setHeader('Content-Length', fs.statSync('all-customer.pdf').size);

    // File stream
    const pdfStream = fs.createReadStream('all-customer.pdf');
    pdfStream.pipe(res);

    res.redirect("/customer/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
  
}