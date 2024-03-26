const express = require("express");

const categoryController = require("../controllers/category.controller");
const router = express.Router();

router.route("/all")
    .get(categoryController.getAll);

router.route("/edit/:id")
    .get(categoryController.editItem);

router.route("/new")
    .get(categoryController.newItem)

router.route("/create")
    .post(categoryController.createItem);

router.route("/update/:id")
    .post(categoryController.updateItem);

router.get("/delete/:id")
    .get(categoryController.deleteItem);

module.exports = router;
