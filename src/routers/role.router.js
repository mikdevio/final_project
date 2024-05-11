import path from "path";
import express from "express";

import * as roleController from "../controllers/role.controller.js";
import { VerifyAuth } from "../middlewares/verify.js";


const router = express.Router();

router.route("/all")
    .get(
        VerifyAuth,
        roleController.getAll
    );

router.route("/edit/:id")
    .get(
        VerifyAuth,
        roleController.editItem
    );

router.route("/new")
    .get(
        VerifyAuth,
        roleController.newItem
    );

router.route("/create")
    .post(
        VerifyAuth,
        roleController.createItem
    );

router.route("/update/:id")
    .post(
        VerifyAuth,
        roleController.updateItem
    );

router.route("/delete/:id")
    .get(
        VerifyAuth,
        roleController.deleteItem
    );

router.route("/report")
    .get(
        VerifyAuth,
        roleController.generateReport
    );

export default router;
