import mongoose from 'mongoose';
import { config } from '../config';
import User from '../models/User';
import Department from '../models/Department';
import Employee from '../models/Employee';
import { hashPassword } from '../utils/password';

async function seed() {
  await mongoose.connect(config.MONGO_URI);
  console.log('Connected for seeding');

  await User.deleteMany({});
  await Employee.deleteMany({});
  await Department.deleteMany({});

  const adminPass = await hashPassword('password123');

  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'admin' });
  console.log('admin created', admin.email);

  const hr = await User.create({ name: 'HR', email: 'hr@example.com', password: adminPass, role: 'hr' });
  const dep = await Department.create({ name: 'Engineering', code: 'ENG' });

  const emp = await User.create({ name: 'John Doe', email: 'john@example.com', password: adminPass, role: 'employee' });
  await Employee.create({ user: emp._id, employeeId: 'EMP-1001', department: dep._id, position: 'Developer', salary: 50000 });

  console.log('seed complete');
  process.exit(0);
}
seed().catch(err => {
  console.error(err);
  process.exit(1);
});
