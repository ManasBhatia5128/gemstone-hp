import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Booking, PaymentOrder } from '@/lib/models';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { PaymentVerificationSchema } from '@/schemas';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate with Zod
    const validatedData = PaymentVerificationSchema.parse(body);
    
    // Verify signature
    const isValid = verifyPaymentSignature(
      validatedData.razorpay_order_id,
      validatedData.razorpay_payment_id,
      validatedData.razorpay_signature
    );
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Payment verification failed - invalid signature' },
        { status: 400 }
      );
    }
    
    // Update payment order
    await PaymentOrder.findOneAndUpdate(
      { razorpay_order_id: validatedData.razorpay_order_id },
      {
        status: 'paid',
        razorpay_payment_id: validatedData.razorpay_payment_id,
        razorpay_signature: validatedData.razorpay_signature,
        paid_at: new Date(),
      }
    );
    
    // Update booking status
    await Booking.findByIdAndUpdate(validatedData.booking_id, {
      status: 'paid',
      payment_id: validatedData.razorpay_payment_id,
    });
    
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully! Our team will contact you within 30 minutes.',
      payment_id: validatedData.razorpay_payment_id,
      booking_id: validatedData.booking_id,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as ZodError<any>).issues },
        { status: 422 }
      );
    }
    
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
