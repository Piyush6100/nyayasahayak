// Thread-safe in-memory OTP cache with automatic expiration
interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

const otpMap = new Map<string, OtpEntry>();

export function generateAndStoreOtp(email: string): string {
  const cleanEmail = email.trim().toLowerCase();
  // Generate random 6-digit number
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpMap.set(cleanEmail, {
    code,
    expiresAt,
    attempts: 0,
  });

  return code;
}

export function verifyOtpCode(email: string, code: string): { valid: boolean; message: string } {
  const cleanEmail = email.trim().toLowerCase();
  const entry = otpMap.get(cleanEmail);

  if (!entry) {
    return { valid: false, message: 'No OTP requested for this email or OTP expired. Please request a new one.' };
  }

  if (Date.now() > entry.expiresAt) {
    otpMap.delete(cleanEmail);
    return { valid: false, message: 'OTP has expired. Please request a new verification code.' };
  }

  if (entry.attempts >= 5) {
    otpMap.delete(cleanEmail);
    return { valid: false, message: 'Too many incorrect attempts. Please request a new code.' };
  }

  if (entry.code !== code.trim()) {
    entry.attempts += 1;
    return { valid: false, message: `Invalid OTP code. ${5 - entry.attempts} attempts remaining.` };
  }

  // Success - remove from map
  otpMap.delete(cleanEmail);
  return { valid: true, message: 'Email verified successfully!' };
}
