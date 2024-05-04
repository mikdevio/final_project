import fs from "fs";
import path from "path";
import Bill from "../models/bill.model.js";

import * as report from "../utils/report.js";
import { dataEmptyFromModel, dataFilledFromModel } from "../utils/func.js";
import { __layout_dashboard } from "../settings.js";


export const getAll = async (_, res) => {
  const billList = await Bill.find({});
  res.render("partials/table.ejs", {
    data: billList,
    table_title: "Bills",
    model: "bill",
    layout: __layout_dashboard,
  });
};

export const editItem = async (req, res) => {
  const id = req.params.id;
  const data = await User.findById(id).exec();
  let fields = dataFilledFromModel(Bill, data);
  // console.log(fields);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "user",
    layout: __layout_dashboard,
  });
};

export const newItem = (req, res) => {
  let fields = dataEmptyFromModel(Bill);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "user",
    layout: __layout_dashboard,
  });
};

export const createItem = async (req, res) => {

  // TODO: Complete create procedure <Bill>

  try {
    
    res.redirect("/bill/all");
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = async (req, res) => {
  const billId = req.params.id;
  try {
    // TODO: Complete update procedure <Bill>
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

export const deleteItem = async (req, res) => {
  const billId = req.params.id;
  try {
    await Bill.findOneAndDelete({ _id: billId });
    res.redirect("/bill/all");
  } catch (error) {
    console.log(error);
  }
};

export const generateReport = async (req, res) => {
  try {
    const billList = await Bill.find({});

    await report.generateAllReport(billList, "bill");

    // TODO: Add open pdf file functionality

    res.redirect("/user/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
}
