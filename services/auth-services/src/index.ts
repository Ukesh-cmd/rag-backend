import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {authRoutes} from './routes/authRoutes';
import { dot } from 'node:test/reporters';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth',authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});