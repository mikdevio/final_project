import express from "express";

import * as saleController from "../controllers/sale.controller.js";
const router = express.Router();

router.route("/pos")
    .get(saleController.callPos);

router.route("/all")
    .get(saleController.getAll);

router.route("/edit/:id")
    .get(saleController.editItem);

router.route("/new")
    .get(saleController.newItem);

router.route("/create")
    .post(saleController.createItem);

router.route("/create-pos")
    .post(saleController.createFromPos);

router.route("/update/:id")
    .post(saleController.updateItem);

router.get("/delete/:id")
    .get(saleController.deleteItem);

router.route("/report")
    .get(saleController.generateReport);

export default router;
