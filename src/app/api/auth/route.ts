import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, setAuthCookie, removeAuthCookie } from '@/lib/auth';
import { LoginSchema } from '@/schemas';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate with Zod
    const validatedData = LoginSchema.parse(body);
    
    // Verify password
    const isValid = await verifyAdminPassword(validatedData.password);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
    
    // Set auth cookie
    await setAuthCookie();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during login:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: (error as ZodError<any>).issues },
        { status: 422 }
      );
    }
    
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await removeAuthCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
