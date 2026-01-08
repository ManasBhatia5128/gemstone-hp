import { z } from 'zod';

export const BookingCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Birth date must be in YYYY-MM-DD format'),
  birth_time: z.string().regex(/^\d{2}:\d{2}$/, 'Birth time must be in HH:MM format').optional().nullable(),
  birth_place: z.string().min(2, 'Birth place must be at least 2 characters').max(200),
  problem: z.string().max(500).optional().nullable(),
});

export const BookingSchema = z.object({
  _id: z.string(),
  name: z.string(),
  phone: z.string(),
  birth_date: z.string(),
  birth_time: z.string().optional().nullable(),
  birth_place: z.string(),
  problem: z.string().optional().nullable(),
  status: z.enum(['pending', 'paid', 'confirmed', 'completed', 'cancelled']),
  payment_id: z.string().optional().nullable(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const BookingStatusUpdateSchema = z.object({
  status: z.enum(['pending', 'paid', 'confirmed', 'completed', 'cancelled']),
});

export type BookingCreate = z.infer<typeof BookingCreateSchema>;
export type Booking = z.infer<typeof BookingSchema>;
export type BookingStatusUpdate = z.infer<typeof BookingStatusUpdateSchema>;
