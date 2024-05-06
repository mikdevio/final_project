import express from "express";
import upload from "../middlewares/upload.js";

import * as customerController from '../controllers/customer.controller.js';

const router = express.Router();

router.route("/all")
    .get(customerController.getAll);

router.route("/edit/:id")
    .get(customerController.editItem);

router.route("/new")
    .get(customerController.newItem);

router.route("/create")
    .post(
        upload.single('img'),
        customerController.createItem
    );

router.route("/update/:id")
    .post(customerController.updateItem);

router.route("/delete/:id")
    .get(customerController.deleteItem);

router.route("/report")
    .get(customerController.generateReport);

export default router;