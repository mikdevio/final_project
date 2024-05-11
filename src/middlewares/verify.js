import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

import * as settings from "../settings.js";

export async function VerifyAuth(req, res, next) {

    try {
        const authHeader = req.headers["cookie"];

        if(!authHeader) return res.sendStatus(401);

        const cookie = authHeader.split("=")[1]

        jwt.verify(cookie, settings.SECRET_ACCESS_TOKEN, async (err, decoded) =>{
            if(err){return res.status(401).json({message: "This session has expired. Please login"})};

            const {id} = decoded;
            const user = await User.findById(id);
            const { password, ...data} = user._doc;

            req.user = data;
            next();
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }

};