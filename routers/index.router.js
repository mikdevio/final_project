import express from 'express';

import billRouter from "./bill.router.js";
import roleRouter from "./role.router.js";
import userRouter from "./user.router.js";
import saleRouter from "./sale.router.js";
import productRouter from "./product.router.js";
import categoryRouter from "./category.router.js";
import customerRouter from "./customer.router.js";

import * as indexController from "../controllers/index.controller.js";

const router = express.Router();

router.route("/")
    .get(indexController.home);

router.route('/about')
    .get(indexController.about);
    
router.use("/bill", billRouter);
router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/sale", saleRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/customer", customerRouter);

export default router;