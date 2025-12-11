import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { config } from "../config";

export function signAccess(payload: string | object | Buffer) {
  // Fix 1: Cast 'payload' to object (or string) to pick a specific overload
  // Fix 2: Cast 'expiresIn' to 'any' to bypass the StringValue mismatch error
  return jwt.sign(payload as object, config.JWT_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY as any,
  });
}

export function signRefresh(payload: string | object | Buffer) {
  return jwt.sign(payload as object, config.JWT_REFRESH_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY as any,
  });
}

export function verifyAccess(token: string): JwtPayload {
  return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
}

export function verifyRefresh(token: string): JwtPayload {
  return jwt.verify(token, config.JWT_REFRESH_SECRET) as JwtPayload;
}