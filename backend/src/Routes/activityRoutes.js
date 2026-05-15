import express from 'express';
import { getAllActivities } from '../Controller/activityController';
import { verifyRole } from '../Middleware/activityMiddleware';

const router = express.router();

router.get('/', verifyRole, getAllActivities);

export default router;