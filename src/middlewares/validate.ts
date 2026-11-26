import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

export function validate(
    schema: ZodType,
    source: 'body' | 'query' | 'params' = 'body',
): RequestHandler {
    return (req, _res, next) => {
        const parsed = schema.parse(req[source]);
        if (source === 'body') {
            req.body = parsed;
        }
        next();
    };
}
