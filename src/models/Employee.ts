import { Schema, model, Document, Types } from 'mongoose';

export interface IEmployee extends Document {
  user: Types.ObjectId;
  employeeId: string;
  department?: Types.ObjectId | null;
  position?: string;
  dateOfJoining?: Date;
  phone?: string;
  address?: string;
  salary?: number;
  documents?: { name: string; url: string }[];
}

const EmployeeSchema = new Schema<IEmployee>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, required: true, unique: true, index: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  position: { type: String },
  dateOfJoining: { type: Date },
  phone: { type: String },
  address: { type: String },
  salary: { type: Number, default: 0 },
  documents: [{ name: String, url: String }]
}, { timestamps: true });

export default model<IEmployee>('Employee', EmployeeSchema);
