import express from "express";

import * as categoryController from "../controllers/category.controller.js";
import { VerifyAuth } from "../middlewares/verify.js";


const router = express.Router();

router.route("/all")
    .get(
        VerifyAuth,
        categoryController.getAll
    );

router.route("/edit/:id")
    .get(
        VerifyAuth,
        categoryController.editItem
    );

router.route("/new")
    .get(
        VerifyAuth,
        categoryController.newItem
    );

router.route("/create")
    .post(
        VerifyAuth,
        categoryController.createItem
    );

router.route("/update/:id")
    .post(
        VerifyAuth,
        categoryController.updateItem
    );

router.get("/delete/:id")
    .get(
        VerifyAuth,
        categoryController.deleteItem
    );

router.route("/report")
    .get(
        VerifyAuth,
        categoryController.generateReport
    );

export default router;
