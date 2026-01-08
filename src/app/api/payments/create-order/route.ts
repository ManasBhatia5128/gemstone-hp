import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Booking, PaymentOrder } from '@/lib/models';
import { razorpayInstance, CONSULTATION_AMOUNT } from '@/lib/razorpay';
import { CreatePaymentOrderSchema } from '@/schemas';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate with Zod
    const validatedData = CreatePaymentOrderSchema.parse(body);
    
    // Verify booking exists
    const booking = await Booking.findById(validatedData.booking_id);
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Create Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: CONSULTATION_AMOUNT,
      currency: 'INR',
      receipt: `booking_${validatedData.booking_id.slice(0, 8)}`,
      notes: {
        booking_id: validatedData.booking_id,
        customer_name: validatedData.name,
        customer_phone: validatedData.phone,
      },
    });
    
    // Store order in database
    await PaymentOrder.create({
      razorpay_order_id: razorpayOrder.id,
      booking_id: validatedData.booking_id,
      amount: CONSULTATION_AMOUNT,
      currency: 'INR',
      customer_name: validatedData.name,
      customer_phone: validatedData.phone,
      customer_email: validatedData.email,
    });
    
    return NextResponse.json({
      order_id: razorpayOrder.id,
      amount: CONSULTATION_AMOUNT,
      currency: 'INR',
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      booking_id: validatedData.booking_id,
      prefill: {
        name: validatedData.name,
        contact: validatedData.phone,
        email: validatedData.email || '',
      },
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as ZodError<any>).issues },
        { status: 422 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
