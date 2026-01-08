import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  phone: string;
  birth_date: string;
  birth_time?: string | null;
  birth_place: string;
  problem?: string | null;
  status: 'pending' | 'paid' | 'confirmed' | 'completed' | 'cancelled';
  payment_id?: string | null;
  created_at: Date;
  updated_at: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    birth_date: { type: String, required: true },
    birth_time: { type: String, default: null },
    birth_place: { type: String, required: true },
    problem: { type: String, default: null },
    status: {
      type: String,
      enum: ['pending', 'paid', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    payment_id: { type: String, default: null },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
