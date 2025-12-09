import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { RefreshToken } from '../models/RefreshToken';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    res.status(201).json({ user, accessToken, refreshToken });
  } catch (err) { next(err); }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body.email, req.body.password);
    res.json({ user, accessToken, refreshToken });
  } catch (err) { next(err); }
}

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    // Remove from DB
    await RefreshToken.findOneAndDelete({ token: refreshToken });

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};