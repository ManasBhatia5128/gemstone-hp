import { z } from 'zod';

export const CreatePaymentOrderSchema = z.object({
  booking_id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email().optional().nullable(),
});

export const PaymentVerificationSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  booking_id: z.string(),
});

export const PaymentOrderSchema = z.object({
  _id: z.string(),
  razorpay_order_id: z.string(),
  booking_id: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.enum(['created', 'paid', 'failed']),
  customer_name: z.string(),
  customer_phone: z.string(),
  customer_email: z.string().optional().nullable(),
  razorpay_payment_id: z.string().optional().nullable(),
  razorpay_signature: z.string().optional().nullable(),
  paid_at: z.date().optional().nullable(),
  created_at: z.date(),
});

export type CreatePaymentOrder = z.infer<typeof CreatePaymentOrderSchema>;
export type PaymentVerification = z.infer<typeof PaymentVerificationSchema>;
export type PaymentOrder = z.infer<typeof PaymentOrderSchema>;
