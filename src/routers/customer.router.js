import express from "express";
import upload from "../middlewares/upload.js";

import * as customerController from '../controllers/customer.controller.js';
import { VerifyAuth } from "../middlewares/verify.js";


const router = express.Router();

router.route("/all")
    .get(
        VerifyAuth,
        customerController.getAll
    );

router.route("/edit/:id")
    .get(
        VerifyAuth,
        customerController.editItem
    );

router.route("/new")
    .get(
        VerifyAuth,
        customerController.newItem
    );
    

router.route("/create")
    .post(
        VerifyAuth,
        upload.single('img'),
        customerController.createItem
    );

router.route("/update/:id")
    .post(
        VerifyAuth,
        customerController.updateItem
    );

router.route("/delete/:id")
    .get(
        VerifyAuth,
        customerController.deleteItem
    );

router.route("/report")
    .get(
        VerifyAuth,
        customerController.generateReport
    );

export default router;