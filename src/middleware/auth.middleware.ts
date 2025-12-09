import { Request, Response, NextFunction } from 'express';
import { verifyAccess } from '../utils/jwt';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyAccess(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthenticated' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};
