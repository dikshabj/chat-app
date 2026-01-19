import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const createTokenAndSaveCookie = (userId, res)=>{
     const token = jwt.sign({userId }, process.env.JWT_TOKEN, {expiresIn : "5d",});
     res.cookie("jwt", token , {
        httpOnly : true, //xss attack
        secure : false,
        sameSite : "lax", //csrf attack
     });
};