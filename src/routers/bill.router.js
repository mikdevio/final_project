import express from "express";
import * as billController from "../controllers/bill.controller.js";

const router = express.Router();

router.route("/all")
    .get(billController.getAll);

router.route("/edit/:id")
    .get(billController.editItem);

router.route("/new")
    .get(billController.newItem);

router.route("/create")
    .post(billController.createItem);

router.route("/update/:id")
    .post(billController.updateItem);

router.get("/delete/:id")
    .get(billController.deleteItem);

router.route("/report")
    .get(billController.generateReport);

export default router;
