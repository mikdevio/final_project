const express = require("express");

const customerController = require('../controllers/customer.controller');
const router = express.Router();

router.route("/all")
    .get(customerController.getAll);

router.route("/edit/:id")
    .get(customerController.editItem);

router.route("/new")
    .get(customerController.newItem);

router.route("/create")
    .post(customerController.createItem);

router.route("/update/:id")
    .post(customerController.updateItem);

router.route("/delete/:id")
    .get(customerController.deleteItem);

module.exports = router;