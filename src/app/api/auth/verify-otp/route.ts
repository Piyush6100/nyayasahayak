import { NextRequest, NextResponse } from 'next/server';
import { verifyOtpCode } from '@/lib/auth/otpStore';

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and OTP code are required.' }, { status: 400 });
    }

    const result = verifyOtpCode(email, code);

    if (!result.valid) {
      return NextResponse.json({ success: false, error: result.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    console.error('Verify OTP API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
