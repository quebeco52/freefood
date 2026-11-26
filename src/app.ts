import cors from 'cors';
import express from 'express';
import type { Express } from 'express';
import { sequelize } from './config/database.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app: Express = express();

app.use(cors());
app.use(express.json());

app.get('/health', async (_req, res) => {
    await sequelize.authenticate();
    res.json({ status: 'ok' });
});

app.use(errorHandler);
