const express = require('express');

const indexController = require("../controllers/index.controller");
const router = express.Router();

router.route("/")
    .get(indexController.home);

router.route('/about')
    .get(indexController.about);

module.exports = router;