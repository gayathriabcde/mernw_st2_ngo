import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './db/dbConnect.js';
import activityRouter from './routes/activityRouter.js';
import submissionRoutes from "./Routes/submissionRoutes.js";
import authRouter from './Routes/authRouter.js';

dotenv.config();
connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use('/api/activity', activityRoutes);
app.use('/api/submission', submissionRoutes);

app.listen(process.env.PORT, () => {
     console.log(`server running on port ${process.env.PORT}`);
});