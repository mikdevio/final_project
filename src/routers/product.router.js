import express from "express";
import upload from "../middlewares/upload.js";

import * as productController from '../controllers/product.controller.js';

const router = express.Router();

router.route('/all')
    .get(productController.getAll);

router.route("/edit/:id")
    .get(productController.editItem);

router.route("/new")
    .get(productController.newItem);

router.route("/create")
    .post(
            upload.single('img'), 
            productController.createItem
        );

router.route("/update/:id")
    .post(productController.updateItem);

router.route("/delete/:id")
    .get(productController.deleteItem);

router.route("/report")
    .get(productController.generateReport);

export default router;
