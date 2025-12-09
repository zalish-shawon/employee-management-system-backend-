import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'admin'|'hr'|'manager'|'employee';
  isActive: boolean;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin','hr','manager','employee'], default: 'employee' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
