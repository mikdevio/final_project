const path = require("path");
const express = require("express");

const roleController = require("../controllers/role.controller");

const router = express.Router();

router.route("/all")
    .get(roleController.getAll);

router.route("/edit/:id")
    .get(roleController.editItem);

router.route("/new")
    .get(roleController.newItem);

router.route("/create")
    .post(roleController.createItem);

router.route("/update/:id")
    .post(roleController.updateItem);

router.route("/delete/:id")
    .get(roleController.deleteItem);

module.exports = router;
