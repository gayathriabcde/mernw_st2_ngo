import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './db/dbConnect.js';

import activityRoutes from './Routes/activityRoutes.js';
import submissionRoutes from "./Routes/submissionRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/activity', activityRoutes);
app.use('/api/submission', submissionRoutes);

app.listen(process.env.PORT, () => {
     console.log(`server running on port ${process.env.PORT}`);
});