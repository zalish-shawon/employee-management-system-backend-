import Employee from '../models/Employee';
import User from '../models/User';
import { Types } from 'mongoose';

export async function createEmployee(payload: any) {
  // if userId provided, validate
  if (payload.userId) {
    const user = await User.findById(payload.userId);
    if (!user) throw { status: 400, message: 'user not found' };
  }
  const doc = await Employee.create(payload);
  return doc;
}

export async function listEmployees(query: any) {
  const { skip, limit, sort } = query;
  const filter: any = {};
  if (query.q) filter.$or = [
    { employeeId: { $regex: query.q, $options: 'i' } },
  ];
  const total = await Employee.countDocuments(filter);
  const items = await Employee.find(filter).skip(skip).limit(limit).sort(sort).populate('user').lean();
  return { total, items };
}

export async function getEmployeeById(id: string) {
  return Employee.findById(id).populate('user');
}
