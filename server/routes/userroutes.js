// server/routes/authroutes.js
import express from "express";
import { register, login, logout, googleLogin, githubLogin } from "../controllers/usercontroller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/github", githubLogin);
router.get("/logout", logout);

export default router;
