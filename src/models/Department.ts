import { Schema, model, Document } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  code?: string;
  head?: string;
}

const DepartmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true, unique: true },
  code: { type: String },
  head: { type: String }
}, { timestamps: true });

export default model<IDepartment>('Department', DepartmentSchema);
