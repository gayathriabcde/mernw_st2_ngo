import express from 'express';
import { createActivity, deleteActivity, getAllActivities, updateActivityFields } from '../Controller/activityController.js';
import { verifyToken } from '../Middleware/activityMiddleware.js';

const router = express.Router(); 
//can also do
//router.use(verifyToken); so as to not have to call verifyToken as middleware for every route

router.get('/', verifyToken ,getAllActivities);
router.post('/', verifyToken, createActivity);
router.patch('/:id', verifyToken, updateActivityFields);
router.delete('/:id', verifyToken, deleteActivity);

export default router;