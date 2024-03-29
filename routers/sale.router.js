const express = require("express");

const saleController = require("../controllers/sale.controller");
const router = express.Router();

router.route("/pos").get(saleController.callPos);

router.route("/all").get(saleController.getAll);

router.route("/edit/:id").get(saleController.editItem);

router.route("/new").get(saleController.newItem);

router.route("/create").post(saleController.createItem);

router.route("/update/:id").post(saleController.updateItem);

router.get("/delete/:id").get(saleController.deleteItem);

module.exports = router;
