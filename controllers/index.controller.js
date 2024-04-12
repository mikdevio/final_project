import path from "path";

import { __layout_main } from "../settings.js";

export const home = (req, res) => {
    res.render("index", {
        layout: __layout_main
    });
};

export const about = (req, res) => {
    res.render("about", {
        layout: __layout_main
    });
};