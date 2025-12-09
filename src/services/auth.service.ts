import User, { IUser } from '../models/User';
import Employee from '../models/Employee';
import { hashPassword, comparePassword } from '../utils/password';
import { signAccess, signRefresh } from '../utils/jwt';

export async function register(payload: { email: string; password: string; name: string; role?: any }) {
  const existing = await User.findOne({ email: payload.email });
  if (existing) throw { status: 400, message: 'Email already used' };

  const hashed = await hashPassword(payload.password);
  const user = await User.create({ email: payload.email, password: hashed, name: payload.name, role: payload.role || 'employee' });

  // Optionally create Employee doc if role != admin
  if (user.role !== 'admin') {
    await Employee.create({ user: user._id, employeeId: `EMP-${Date.now()}` });
  }

  const accessToken = signAccess({ id: user._id, role: user.role });
  const refreshToken = signRefresh({ id: user._id, role: user.role });

  return {
    message: 'Registration successful!',
    user,
    accessToken,
    refreshToken
  };
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw { status: 400, message: 'Invalid credentials' };

  const ok = await comparePassword(password, user.password);
  if (!ok) throw { status: 400, message: 'Invalid credentials' };

  const accessToken = signAccess({ id: user._id, role: user.role });
  const refreshToken = signRefresh({ id: user._id, role: user.role });

  return {
    
    message: 'Login successful!',
    user,
    accessToken,
    refreshToken
  };
}

