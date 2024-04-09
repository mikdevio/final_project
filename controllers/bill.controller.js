const fs = require("fs");
const path = require("path");
const report = require("../utils/report");

const Bill = require("../models/bill.model");
const { dataEmptyFromModel, dataFilledFromModel } = require("../utils/func");


exports.getAll = async (_, res) => {
  const billList = await Bill.find({});
  res.render("partials/table.ejs", {
    data: billList,
    table_title: "Bills",
    model: "bill",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.editItem = async (req, res) => {
  const id = req.params.id;
  const data = await User.findById(id).exec();
  let fields = dataFilledFromModel(Bill, data);
  // console.log(fields);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "user",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.newItem = (req, res) => {
  let fields = dataEmptyFromModel(Bill);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "user",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.createItem = async (req, res) => {
//   const newUser = new Bill({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     password: req.body.password,
//     role: req.body.role,
//   });

  try {
    // const result = await newUser.save();
    res.redirect("/bill/all");
  } catch (err) {
    console.log(err);
  }
};

exports.updateItem = async (req, res) => {
  const billId = req.params.id;
  try {
    // await User.findOneAndUpdate(
    //   { _id: userId },
    //   {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     role: req.body.role,
    //   }
    // );
    res.redirect("/bill/all");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteItem = async (req, res) => {
  const billId = req.params.id;
  try {
    await Bill.findOneAndDelete({ _id: billId });
    res.redirect("/bill/all");
  } catch (error) {
    console.log(error);
  }
};

exports.generateReport = async (req, res) => {
  try {
    const billList = await Bill.find({});

    await report.generateAllReport(billList, "bill");

    // Header file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=all-bill.pdf');
    res.setHeader('Content-Length', fs.statSync('all-bill.pdf').size);

    // File stream
    const pdfStream = fs.createReadStream('all-bill.pdf');
    pdfStream.pipe(res);

    res.redirect("/user/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
}