import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { PaymentOrder } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    await connectDB();
    const { bookingId } = await params;
    
    const payment = await PaymentOrder.findOne({ booking_id: bookingId }).lean();
    
    if (!payment) {
      return NextResponse.json({
        status: 'not_initiated',
        booking_id: bookingId,
      });
    }
    
    return NextResponse.json({
      status: payment.status,
      booking_id: bookingId,
      razorpay_order_id: payment.razorpay_order_id,
      razorpay_payment_id: payment.razorpay_payment_id,
      amount: payment.amount,
      paid_at: payment.paid_at,
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment status' },
      { status: 500 }
    );
  }
}
