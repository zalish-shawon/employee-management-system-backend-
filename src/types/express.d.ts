import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // will store decoded JWT payload (id, role, etc.)
    }
  }
}
