import express from 'express';
import { getAllActivities } from '../Controller/activityController.js';
import { verifyRole } from '../Middleware/activityMiddleware.js';

const router = express.Router();

router.get('/', verifyRole, getAllActivities);

export default router;