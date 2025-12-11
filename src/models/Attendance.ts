import { Schema, model, Document, Types } from 'mongoose';

export interface IAttendance extends Document {
  employee: Types.ObjectId;
  clockIn?: Date;
  clockOut?: Date;
  status?: string;
  date: Date;
}

const AttendanceSchema = new Schema<IAttendance>({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  clockIn: { type: Date },
  clockOut: { type: Date },
  status: { type: String, enum: ['present', 'absent', 'leave'], default: 'present' },
  date: { type: Date, required: true, index: true }
}, { timestamps: true });

export default model<IAttendance>('Attendance', AttendanceSchema);
