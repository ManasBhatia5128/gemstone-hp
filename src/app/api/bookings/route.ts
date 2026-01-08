import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Booking } from '@/lib/models';
import { BookingCreateSchema } from '@/schemas';
import { ZodError } from 'zod';

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ created_at: -1 }).lean();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate with Zod
    console.log(body);
    const validatedData = BookingCreateSchema.parse(body);
    
    // Create booking
    const booking = await Booking.create(validatedData);
    
    return NextResponse.json(
      {
        ...booking.toObject(),
        message: 'Booking successful! Our team will contact you within 30 minutes.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as ZodError<any>).issues },
        { status: 422 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
