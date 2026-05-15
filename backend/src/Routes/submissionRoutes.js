import express from "express";

import {
  getAllSubmissions,
  createSubmission,
  updateSubmission,
  deleteSubmission
} from "../Controller/submissionController.js";

import { verifyRole } from "../Middleware/activityMiddleware.js";

const router = express.Router();

router.get("/", getAllSubmissions);
router.post("/", createSubmission);
router.patch("/:id", updateSubmission);
router.delete("/:id", deleteSubmission);

export default router;