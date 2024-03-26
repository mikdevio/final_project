const express = require("express");

const productController = require('../controllers/product.controller');

const router = express.Router();

router.route('/all')
    .get(productController.getAll);

router.route("/edit/:id")
    .get(productController.editItem);

router.route("/new")
    .get(productController.newItem);

router.route("/create")
    .post(productController.createItem);

router.route("/update/:id")
    .post(productController.updateItem);

router.route("/delete/:id")
    .get(productController.deleteItem);

module.exports = router;
