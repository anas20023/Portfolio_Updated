import mongoose, { Schema, Document, Model } from 'mongoose';

export type LeadStatus = 'new' | 'contacted' | 'in_discussion' | 'won' | 'archived';
export type LeadPriority = 'low' | 'normal' | 'high';

export interface ILeadNote {
  text: string;
  createdAt: Date;
}

export interface ILead extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: LeadStatus;
  priority: LeadPriority;
  notes: ILeadNote[];
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_discussion', 'won', 'archived'],
      default: 'new',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'normal', 'high'],
      default: 'normal',
    },
    notes: [
      {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

