import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './db/dbConnect.js';

dotenv.config();
connectDB();

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/activity',);

app.listen(process.env.PORT, () => {
     console.log(`server running on port ${process.env.PORT}`);
});