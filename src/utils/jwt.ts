import jwt from 'jsonwebtoken';
import { config } from '../config';

export function signAccess(payload: object) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRY });
}
export function signRefresh(payload: object) {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRY });
}
export function verifyAccess(token: string) {
  return jwt.verify(token, config.JWT_SECRET) as any;
}
export function verifyRefresh(token: string) {
  return jwt.verify(token, config.JWT_REFRESH_SECRET) as any;
}
