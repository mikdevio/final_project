import express from "express";
import upload from "../middlewares/upload.js";

import { VerifyAuth } from "../middlewares/verify.js"

import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/login")
  .get(userController.getLogin)
  .post(userController.postLogin);

router
  .route("/logout")
  .get(userController.getLogout);

router
  .route("/signup")
  .get(userController.getSignup)
  .post(userController.postSignup);

router.route("/dashboard")
  .get(
    VerifyAuth, 
    userController.getDashboard
  );

router.route("/all")
  .get(
    VerifyAuth,
    userController.getAll
  );

router.route("/edit/:id")
  .get(
    VerifyAuth, 
    userController.editItem
  );

router.route("/new")
  .get(
    VerifyAuth, 
    userController.newItem
  );

router.route("/create")
  .post(
    VerifyAuth,
    upload.single('img'), 
    userController.createItem
  );

router.route("/update/:id")
  .post(
    VerifyAuth, 
    userController.uptadeItem
  );

router.route("/delete/:id")
  .get(
    VerifyAuth, 
    userController.deleteItem
  );

router.route("/report")
  .get(VerifyAuth, 
    userController.generateReport
  );

export default router;
