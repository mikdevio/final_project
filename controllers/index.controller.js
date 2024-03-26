const path = require("path");


exports.home = (req, res) => {
    res.render("index", {
        layout: path.join(__dirname, "../views/layouts/main")
    });
};

exports.about = (req, res) => {
    res.render("about", {
        layout: path.join(__dirname, "../views/layouts/main")
    });
};