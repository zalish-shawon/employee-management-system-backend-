import { Schema, model, Document, Types } from 'mongoose';

export interface IAuditLog extends Document {
  user?: Types.ObjectId;
  action: string;
  targetType?: string;
  targetId?: Types.ObjectId | string;
  meta?: any;
}

const AuditLogSchema = new Schema<IAuditLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  targetType: { type: String },
  targetId: { type: Schema.Types.Mixed },
  meta: { type: Schema.Types.Mixed }
}, { timestamps: true });

export default model<IAuditLog>('AuditLog', AuditLogSchema);
