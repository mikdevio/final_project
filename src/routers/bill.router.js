import express from "express";

import * as billController from "../controllers/bill.controller.js";
import { VerifyAuth } from "../middlewares/verify.js";


const router = express.Router();

router.route("/all")
    .get(
        VerifyAuth,
        billController.getAll
    );

router.route("/edit/:id")
    .get(
        VerifyAuth,
        billController.editItem
    );

router.route("/new")
    .get(
        VerifyAuth,
        billController.newItem
    );

router.route("/create")
    .post(
        VerifyAuth,
        billController.createItem
    );

router.route("/update/:id")
    .post(
        VerifyAuth,
        billController.updateItem
    );

router.get("/delete/:id")
    .get(
        VerifyAuth,
        billController.deleteItem
    );

router.route("/report")
    .get(
        VerifyAuth,
        billController.generateReport
    );

export default router;
