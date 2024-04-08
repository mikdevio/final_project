const express = require('express');

const billRouter = require("./bill.router");
const roleRouter = require("./role.router");
const userRouter = require("./user.router");
const saleRouter = require("./sale.router");
const productRouter = require("./product.router");
const categoryRouter = require("./category.router");
const customerRouter = require("./customer.router");

const indexController = require("../controllers/index.controller");

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

module.exports = router;