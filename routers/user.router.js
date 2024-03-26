const express = require("express");

const userController = require('../controllers/user.controller');

const router = express.Router();

router.route("/login")
    .get(userController.getLogin)
    .post(userController.postSignup);

router.route("/signup")
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
    .get(userController.createItem);

router.route("/update/:id")
    .post(userController.uptadeItem);

router.route("/delete/:id")
    .get(userController.deleteItem);

module.exports = router;
