import express from "express";
import {  googleAuth, logIn, logOut, resetPassword, sendOTP, signUp, verifyOTP } from "../controller/authController.js";

const authRouter = express.Router();


authRouter.post("/signup", signUp)
authRouter.post("/login", logIn)
authRouter.get("/logout", logOut)
authRouter.post("/send-otp", sendOTP)
authRouter.post("/verify-otp", verifyOTP)
authRouter.post("/reset-password", resetPassword)
authRouter.post("/googleauth", googleAuth)

export default authRouter;