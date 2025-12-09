import { Schema, model, Document } from "mongoose";

export interface IRefreshToken extends Document {
  user: Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

export const RefreshToken = model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
