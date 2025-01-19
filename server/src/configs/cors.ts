import cors from 'cors';
import { Application } from 'express';

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://localhost:5173',
    ],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};

export const useCors = (app: Application) => {
    app.use(cors(corsOptions));
};