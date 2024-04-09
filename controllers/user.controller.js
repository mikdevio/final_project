const fs = require("fs");
const path = require("path");

const report = require("../utils/report");
const User = require("../models/user.model");
const { dataEmptyFromModel, dataFilledFromModel } = require("../utils/func");

exports.getLogin = (req, res) => {
  res.render("user.login.ejs", {
    layout: path.join(__dirname, "../views/layouts/main")
  });
};

exports.postLogin = (req, res) => {
  const data = req.body;
  console.log(data);
  res.send(data);
};

exports.getSignup = (req, res) => {
  res.render("user.signup.ejs", {
    layout: path.join(__dirname, "../views/layouts/main")
  });
};

exports.postSignup = (req, res) => {
  const data = req.body;
  console.log(data);
  res.send(data);
};

exports.getDashboard = (req, res) => {
  res.render("user.dashboard.ejs", {
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.getAll = async (_, res) => {
  const usersList = await User.find({});
  res.render("partials/table.ejs", {
    data: usersList,
    table_title: "Users",
    model: "user",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.editItem = async (req, res) => {
  const id = req.params.id;
  const data = await User.findById(id).exec();
  let fields = dataFilledFromModel(User, data);
  // console.log(fields);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "user",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.newItem = (req, res) => {
  let fields = dataEmptyFromModel(User);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "user",
    layout: path.join(__dirname, "../views/layouts/dashboard"),
  });
};

exports.createItem = async (req, res) => {
  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  try {
    const result = await newUser.save();
    res.redirect("/user/all");
  } catch (err) {
    console.log(err);
  }
};

exports.uptadeItem = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      }
    );
    res.redirect("/user/all");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteItem = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findOneAndDelete({ _id: userId });
    res.redirect("/user/all");
  } catch (error) {
    console.log(error);
  }
};

exports.generateReport = async (req, res) => {
  try {
    const userList = await User.find({});

    await report.generateAllReport(userList, "user");

    // Header file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=all-user.pdf');
    res.setHeader('Content-Length', fs.statSync('all-user.pdf').size);

    // File stream
    const pdfStream = fs.createReadStream('all-user.pdf');
    pdfStream.pipe(res);

    res.redirect("/user/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
  
}
