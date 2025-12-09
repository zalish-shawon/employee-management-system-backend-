import { Schema, model, Document, Types } from 'mongoose';

export interface ILeave extends Document {
  employee: Types.ObjectId;
  type: string;
  from: Date;
  to: Date;
  reason?: string;
  status: 'pending'|'approved'|'denied';
  approver?: Types.ObjectId;
}

const LeaveSchema = new Schema<ILeave>({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  type: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ['pending','approved','denied'], default: 'pending' },
  approver: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<ILeave>('Leave', LeaveSchema);
