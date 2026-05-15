import express from 'express';
import { createActivity, deleteActivity, getAllActivities, updateActivityFields } from '../Controller/activityController.js';
import { verifyToken } from '../Middleware/activityMiddleware.js';

const router = express.Router();

router.get('/', verifyRole,getAllActivities);
router.post('/', verifyToken, createActivity);
router.patch('/:id', verifyToken, updateActivityFields);
router.delete('/:id', verifyToken, deleteActivity);

export default router;