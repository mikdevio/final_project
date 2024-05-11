import express from "express";

import { VerifyAuth } from "../middlewares/verify.js"

import * as saleController from "../controllers/sale.controller.js";
const router = express.Router();

router.route("/pos")
    .get(
        VerifyAuth,
        saleController.callPos
    );

router.route("/all")
    .get(
        VerifyAuth,
        saleController.getAll
    );

router.route("/edit/:id")
    .get(VerifyAuth, 
        saleController.editItem
    );

router.route("/new")
    .get(
        VerifyAuth,
        saleController.newItem
    );

router.route("/create")
    .post(
        VerifyAuth,
        saleController.createItem
    );

router.route("/create-pos")
    .post(
        VerifyAuth,
        saleController.createFromPos
    );

router.route("/update/:id")
    .post(
        VerifyAuth,
        saleController.updateItem
    );

router.get("/delete/:id")
    .get(
        VerifyAuth,
        saleController.deleteItem
    );

router.route("/report")
    .get(
        VerifyAuth,
        saleController.generateReport
    );

export default router;
