import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { validate } from '../src/middlewares/validate.js';

describe('validate middleware', () => {
    it('parses valid body and calls next', () => {
        const schema = z.object({ name: z.string().min(1) });
        const middleware = validate(schema);
        const req = { body: { name: 'Bread' } } as any;
        const next = vi.fn();

        middleware(req, {} as any, next);

        expect(req.body).toEqual({ name: 'Bread' });
        expect(next).toHaveBeenCalledOnce();
    });
});