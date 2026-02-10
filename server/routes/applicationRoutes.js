import express from "express";
import { applyForInternship, getUserApplications, getApplicationStats, unsaveInternship } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/apply", applyForInternship);
router.post("/unsave", unsaveInternship);
router.get("/:userId", getUserApplications);
router.get("/stats/:userId", getApplicationStats);

export default router;
