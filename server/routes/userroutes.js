// server/routes/authroutes.js
import express from "express";
import { register, login, logout, googleLogin } from "../controllers/usercontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/logout", logout);

export default router;
