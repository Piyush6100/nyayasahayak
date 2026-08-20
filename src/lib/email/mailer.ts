import nodemailer from 'nodemailer';

const user = process.env.SMTP_USER || 'nayaysathi@gmail.com';
const pass = (process.env.SMTP_PASS || 'ynvv bdez zloj vkym').replace(/\s+/g, '');
const fromName = process.env.SMTP_FROM_NAME || 'NyayaSahayak';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});

export async function sendOtpEmail(to: string, otp: string, purpose: 'signup' | 'login' | 'verify' = 'signup') {
  const title =
    purpose === 'signup'
      ? 'Verify your email address'
      : purpose === 'login'
      ? 'Login Verification Code'
      : 'Email Verification Code';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
          .container { max-width: 520px; margin: 30px auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background: #0f3d2e; color: #ffffff; padding: 24px 32px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.85; }
          .content { padding: 32px; text-align: center; }
          .otp-box { background: #f1f5f9; border: 2px dashed #0f3d2e; border-radius: 12px; padding: 18px 24px; display: inline-block; margin: 20px 0; }
          .otp-code { font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0f3d2e; font-family: monospace; }
          .expiry { font-size: 12px; color: #64748b; margin-top: 10px; }
          .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; font-size: 11px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚖️ ${fromName}</h1>
            <p>Citizen Legal & Civic Intelligence Platform</p>
          </div>
          <div class="content">
            <h2 style="font-size: 18px; margin-top: 0; color: #1e293b;">${title}</h2>
            <p style="font-size: 14px; color: #475569; line-height: 1.5;">
              Use the following One-Time Password (OTP) to complete your verification on <strong>${fromName}</strong>.
            </p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p class="expiry">⏱️ This code is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
          </div>
          <div class="footer">
            If you did not request this email, please ignore this message.<br>&copy; ${new Date().getFullYear()} ${fromName}. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  return await transporter.sendMail({
    from: `"${fromName}" <${user}>`,
    to,
    subject: `${otp} is your verification code for ${fromName}`,
    html,
  });
}
