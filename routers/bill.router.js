const express = require("express");

const billController = require("../controllers/bill.controller");
const router = express.Router();

router.route("/all").get(billController.getAll);

router.route("/edit/:id").get(billController.editItem);

router.route("/new").get(billController.newItem);

router.route("/create").post(billController.createItem);

router.route("/update/:id").post(billController.updateItem);

router.get("/delete/:id").get(billController.deleteItem);

module.exports = router;
