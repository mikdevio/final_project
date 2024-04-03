const path = require("path");

const Sale = require("../models/sale.model");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

exports.callPos = async (req, res) => {

  const productList = await Product.find({});
  const categoryList = await Category.find({});

  res.render("partials/pos.ejs", {
    products: productList,
    categories: categoryList,
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
    products: [],
    totalAmount: req.body.totalAmount,
  });

  try {
    const result = await newSale.save();
    res.redirect("/sale/all");
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
