import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { app } from '../src/app.js';
import { sequelize } from '../src/config/database.js';

describe('GET /health', () => {
    it('returns 200 ok when the database is reachable', async () => {
        vi.spyOn(sequelize, 'authenticate').mockResolvedValue(undefined);

        const res = await request(app).get('/health');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: 'ok' });
    });
});
