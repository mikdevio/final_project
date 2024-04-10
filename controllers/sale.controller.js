const fs = require("fs");
const path = require("path");

const report = require("../utils/report");
const Sale = require("../models/sale.model");
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Customer = require("../models/customer.model");
const Bill = require("../models/bill.model");
const User = require("../models/user.model");

const { dataEmptyFromModel, dataFilledFromModel } = require("../utils/func");

exports.callPos = async (req, res) => {

  const productList = await Product.find({});
  const categoryList = await Category.find({});
  const customerList = await Customer.find({});

  res.render("partials/pos.ejs", {
    products: productList,
    categories: categoryList,
    customers: customerList,
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.getAll = async (req, res) => {
  const salesList = await Sale.find({});
  res.render("partials/table.ejs", {
    data: salesList,
    table_title: "Sales",
    model: "sale",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Sale.findById(id).exec();
  let fields = dataFilledFromModel(Sale, data);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "sale",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.newItem = (req, res) => {
  let fields = dataEmptyFromModel(Sale);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "sale",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.createItem = async (req, res) => {
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

exports.createFromPos = async(req, res) => {

  const newSale = new Sale({
    customer: req.body.data.customer,
    products: req.body.data.products,
    totalAmount: req.body.data.totalAmount,
    subTotal: req.body.data.subTotal,
    discountAmount: req.body.data.discountAmount,
    taxAmount: req.body.data.taxAmount
  });

  const Manager = User.findOne({role:"Manager"});
  
  const newBill = new Bill({
    sale: newSale._id,
    userId: Manager._id,
    paymentMethod: req.body.paymentMode
  });

  try {
    // Update products quantity
    for (const product of req.body.data.products) {
      await Product.findOneAndUpdate(
        {_id: product.productID}, 
        {$inc: {'quantity': -product.quantity}}
      )
      ;
    }
    await newSale.save();
    await newBill.save();
    res.json({success: true});
  } catch (err) {
    console.log(err);
  }
};

exports.updateItem = async (req, res) => {
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

exports.deleteItem = async (req, res) => {
  const saleId = req.params.id;
  try {
    await Product.findOneAndDelete({ _id: saleId });
    res.redirect("/sale/all");
  } catch (error) {
    console.log(error);
  }
};

exports.generateReport = async (req, res) => {
  try {
    const saleList = await Sale.find({});

    await report.generateAllReport(saleList, "sale");

    // Header file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=all-sale.pdf');
    res.setHeader('Content-Length', fs.statSync('all-sale.pdf').size);

    // File stream
    const pdfStream = fs.createReadStream('all-sale.pdf');
    pdfStream.pipe(res);

    res.redirect("/sale/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
  
}