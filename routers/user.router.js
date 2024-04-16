import express from "express";

import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/login")
  .get(userController.getLogin)
  .post(userController.postLogin);

router
  .route("/signup")
  .get(userController.getSignup)
  .post(userController.postSignup);

router.route("/dashboard")
  .get(userController.getDashboard);

router.route("/all")
  .get(userController.getAll);

router.route("/edit/:id")
  .get(userController.editItem);

router.route("/new")
  .get(userController.newItem);

router.route("/create")
  .post(userController.createItem);

router.route("/update/:id")
  .post(userController.uptadeItem);

router.route("/delete/:id")
  .get(userController.deleteItem);

router.route("/report")
  .get(userController.generateReport);

export default router;
