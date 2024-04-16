import path from "path";
import express from "express";

import * as roleController from "../controllers/role.controller.js";

const router = express.Router();

router.route("/all")
    .get(roleController.getAll);

router.route("/edit/:id")
    .get(roleController.editItem);

router.route("/new")
    .get(roleController.newItem);

router.route("/create")
    .post(roleController.createItem);

router.route("/update/:id")
    .post(roleController.updateItem);

router.route("/delete/:id")
    .get(roleController.deleteItem);

router.route("/report")
    .get(roleController.generateReport);

export default router;
