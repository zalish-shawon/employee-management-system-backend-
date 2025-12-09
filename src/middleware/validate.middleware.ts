import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: { body?: ZodSchema<any>, query?: ZodSchema<any>, params?: ZodSchema<any> }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) schema.body.parse(req.body);
      if (schema.query) schema.query.parse(req.query);
      if (schema.params) schema.params.parse(req.params);
      next();
    } catch (err) {
      return res.status(400).json({ message: 'Validation error', errors: (err as any).errors ?? err });
    }
  };
};
