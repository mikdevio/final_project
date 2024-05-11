import express from "express";
import upload from "../middlewares/upload.js";

import * as productController from '../controllers/product.controller.js';
import { VerifyAuth } from "../middlewares/verify.js";


const router = express.Router();

router.route('/all')
    .get(
        VerifyAuth,
        productController.getAll
    );

router.route("/edit/:id")
    .get
    VerifyAuth,
    (productController.editItem
        
    );

router.route("/new")
    .get
    VerifyAuth,
    (productController.newItem
        
    );

router.route("/create")
    .post(
        
        VerifyAuth,
        upload.single('img'), 
        productController.createItem
    );

router.route("/update/:id")
    .post(
        VerifyAuth,
        productController.updateItem
    );

router.route("/delete/:id")
    .get(
        VerifyAuth,
        productController.deleteItem
    );

router.route("/report")
    .get(
        VerifyAuth,
        productController.generateReport
    );

export default router;
