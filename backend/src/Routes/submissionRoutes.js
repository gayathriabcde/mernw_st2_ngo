import express from "express";

import {
  getAllSubmissions,
  createSubmission,
  updateSubmission,
  deleteSubmission
} from "../Controller/submissionController.js";

import { verifyRole, verifyToken } from "../Middleware/activityMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllSubmissions);
router.post("/", verifyToken, createSubmission);
router.patch("/:id", verifyToken, updateSubmission);
router.delete("/:id", verifyToken, deleteSubmission);

export default router;