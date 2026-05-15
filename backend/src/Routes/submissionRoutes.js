import express from "express";

import {
  getAllSubmissions,
  createSubmission,
} from "../Controller/submissionController.js";

import { verifyRole } from "../Middleware/activityMiddleware.js";

const router = express.Router();

router.get("/", getAllSubmissions);
router.post("/", createSubmission);

export default router;