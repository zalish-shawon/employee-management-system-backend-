import bcrypt from 'bcryptjs';
import { config } from '../config';

export const hashPassword = (plain: string) => bcrypt.hash(plain, config.SALT_ROUNDS);
export const comparePassword = (plain: string, hashed: string) => bcrypt.compare(plain, hashed);
