import fs from "fs";
import path from "path";

import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import * as report from "../utils/report.js";
import * as settings from "../settings.js";

import { dataEmptyFromModel, dataFilledFromModel } from "../utils/func.js";

export const getLogin = (req, res) => {
  res.render("user.login.ejs", {
    layout: settings.__layout_main,
    message: "",
  });
};

export const postLogin = async (req, res) => {
  const data = req.body;

  // Check if user exist
  const userFound = await User.findOne({ email: data.email }).select("+password");
  if(!userFound){
    return res.render("user.login.ejs", {
      layout: settings.__layout_main,
      message: `User ${data.email}  not found.`,
    });
  };

  // Checking password valid
  const passValid = await userFound.comparePassword(data.password);
  if(!passValid){
    return res.render("user.login.ejs", {
      layout: settings.__layout_main,
      message: `Password incorrect.`,
    });
  }
  
  // Open session
  let options = {
    maxAge: 20*60*1000,
    httpOnly: true, 
    secure: true,
    sameSite: "None",
  };

  // Session token
  const token = userFound.generateAccessJWT();
  // Set token to response header
  res.cookie("SessionID", token, options);
  // redirect to dashboard
  res.redirect("/user/dashboard");
};

export const getSignup = async(req, res) => {
  const rolesList = await Role.find({});
  res.render("user.signup.ejs", {
    roles: rolesList,
    layout: settings.__layout_main,
    message: "",
  });
};

export const postSignup = async (req, res) => {
  // Get params from body
  const { first_name, last_name, email, password } = req.body;
  try {
    // Create a user to save
    const newUser = new User({
      first_name,
      last_name,
      email,
      password
    });

    // Check if user exist in database
    const userExist = await User.findOne({ email: email });
    if(userExist){
      const rolesList = await Role.find({});
      return res.render("user.signup.ejs",{
        layout: settings.__layout_main,
        roles: rolesList,
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
    };

    const savedUser = await newUser.save();
    const {role, ...user_data } = savedUser._doc;
    res.render("user.login.ejs", {
      layout: settings.__layout_main,
      status: "success",
      data: [user_data],
      message: "Thank you for registering with us. Your account has been successfully created."
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status:"error",
      code:500,
      data:[],
      message: "Internal Server Error",
    })
  }
  res.end();
};

export const getDashboard = (req, res) => {
  res.render("user.dashboard.ejs", {
    layout: settings.__layout_dashboard,
  });
};

export const getAll = async (_, res) => {
  const usersList = await User.find({});
  res.render("partials/table.ejs", {
    data: usersList,
    table_title: "Users",
    model: "user",
    layout: settings.__layout_dashboard,
  });
};

export const editItem = async (req, res) => {
  const id = req.params.id;
  const data = await User.findById(id).exec();
  let fields = dataFilledFromModel(User, data);
  // console.log(fields);
  res.render("partials/edit.form.ejs", {
    data: fields,
    model_name: "user",
    layout: settings.__layout_dashboard,
  });
};

export const newItem = (req, res) => {
  let fields = dataEmptyFromModel(User);
  res.render("partials/new.form.ejs", {
    data: fields,
    model_name: "user",
    layout: settings.__layout_dashboard,
  });
};

export const createItem = async (req, res) => {
  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    img: { 
      data: fs.readFileSync(path.join(settings.__dirname, "uploads/user", req.body["img.data"])),
      contentType: "image/png",
    },
  });

  try {
    const result = await newUser.save();
    res.redirect("/user/all");
  } catch (err) {
    console.log(err);
  }
};

export const uptadeItem = async (req, res) => {
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

export const deleteItem = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findOneAndDelete({ _id: userId });
    res.redirect("/user/all");
  } catch (error) {
    console.log(error);
  }
};

export const generateReport = async (req, res) => {
  try {
    const userList = await User.find({});

    await report.generateAllReport(userList, "user");

    // TODO: Fix path problem for report pdf file
    // // Header file
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=all-user.pdf');
    // res.setHeader('Content-Length', fs.statSync('all-user.pdf').size);

    // // File stream
    // const pdfStream = fs.createReadStream('all-user.pdf');
    // pdfStream.pipe(res);

    res.redirect("/user/all");

  } catch (error) {
    console.error('Error during report generation process:', error);
    res.status(500).send('Error on PDF report generation.');
  }
  
}
