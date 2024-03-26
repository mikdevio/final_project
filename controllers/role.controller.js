const path = require("path");

const Role = require("../models/role.model");
const { dataEmptyFromModel, dataFilledFromModel } = require("../utils/func");

exports.getAll = async (req, res) => {
  const rolesList = await Role.find({});
  res.render("partials/table.ejs", {
    data: rolesList,
    table_title: "Roles",
    model: "role",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.editItem = async (req, res) => {
  const id = req.params.id;
  const data = await Role.findById(id).exec();
  let fields = dataFilledFromModel(Role, data);
  // console.log(fields);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "role",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.newItem = (req, res) => {
  let fields = dataEmptyFromModel(Role);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "role",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.createItem = async (req, res) => {
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

exports.updateItem = async (req, res) => {
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

exports.deleteItem = async (req, res) => {
  const roleId = req.params.id;
  try {
    await Role.findOneAndDelete({ _id: roleId });
    res.redirect("/role/all");
  } catch (error) {
    console.log(error);
  }
};
