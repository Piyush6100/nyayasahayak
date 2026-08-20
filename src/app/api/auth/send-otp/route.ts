import { NextRequest, NextResponse } from 'next/server';
import { generateAndStoreOtp } from '@/lib/auth/otpStore';
import { sendOtpEmail } from '@/lib/email/mailer';

export async function POST(req: NextRequest) {
  try {
    const { email, purpose } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const otp = generateAndStoreOtp(email);

    // Send OTP email using your configured Gmail SMTP (nayaysathi@gmail.com)
    try {
      await sendOtpEmail(email, otp, purpose || 'signup');
      return NextResponse.json({
        success: true,
        message: `Verification code has been sent to ${email}.`,
      });
    } catch (mailError: any) {
      console.error('SMTP Mail send failed:', mailError);
      return NextResponse.json({
        success: false,
        error: `Could not send email via SMTP: ${mailError.message}`,
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Send OTP API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
