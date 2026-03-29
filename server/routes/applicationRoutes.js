import express from "express";
import { applyForInternship, getUserApplications, getApplicationStats, unsaveInternship } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/apply", applyForInternship);
router.post("/unsave", unsaveInternship);
router.get("/stats/:userId", getApplicationStats);
router.get("/:userId", getUserApplications);

export default router;
