import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaymentOrder extends Document {
  razorpay_order_id: string;
  booking_id: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  razorpay_payment_id?: string | null;
  razorpay_signature?: string | null;
  paid_at?: Date | null;
  created_at: Date;
}

const PaymentOrderSchema = new Schema<IPaymentOrder>(
  {
    razorpay_order_id: { type: String, required: true, unique: true },
    booking_id: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'INR' },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
      default: 'created',
    },
    customer_name: { type: String, required: true },
    customer_phone: { type: String, required: true },
    customer_email: { type: String, default: null },
    razorpay_payment_id: { type: String, default: null },
    razorpay_signature: { type: String, default: null },
    paid_at: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

export const PaymentOrder: Model<IPaymentOrder> =
  mongoose.models.PaymentOrder ||
  mongoose.model<IPaymentOrder>('PaymentOrder', PaymentOrderSchema);
