import fs from "fs";
import path from "path";

import * as report from "../utils/report.js";
import Role from "../models/role.model.js";
import { dataEmptyFromModel, dataFilledFromModel } from "../utils/func.js";

import { __layout_dashboard } from "../settings.js";

export const getAll = async (req, res) => {
  const rolesList = await Role.find({});
  res.render("partials/table.ejs", {
    data: rolesList,
    table_title: "Roles",
    model: "role",
    layout: __layout_dashboard,
  });
};

export const editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Role.findById(id).exec();
  let fields = dataFilledFromModel(Role, data);
  // console.log(fields);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "role",
    layout: __layout_dashboard,
  });
};

export const newItem = (req, res) => {
  let fields = dataEmptyFromModel(Role);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "role",
    layout: __layout_dashboard,
  });
};

export const createItem = async (req, res) => {
  const newCustomer = new Role({
    name: req.body.name,
    description: req.body.description,
    permissions: req.body.permissions,
  });

  try {
    const result = await newCustomer.save();
    res.redirect("/role/all");
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
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions,
      }
    );
    res.redirect("/role/all");
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (req, res) => {
  const roleId = req.params.id;
  try {
    await Role.findOneAndDelete({ _id: roleId });
    res.redirect("/role/all");
  } catch (error) {
    console.log(error);
  }
};

export const generateReport = async (req, res) => {
  try {
    const roleList = await Role.find({});

    await report.generateAllReport(roleList, "role");

    // TODO: Add open pdf file functionality

    res.redirect("/user/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
}
