import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, subject, description } = await request.json();

    if (!email || !subject || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `NyayaSahayak Contact Form <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to yourself
      replyTo: email, // So you can reply directly to the user
      subject: `New Contact Inquiry: ${subject}`,
      text: `You have a new inquiry from the Contact Us page.\n\nUser Email: ${email}\nSubject: ${subject}\n\nDescription:\n${description}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #000;">New Contact Inquiry</h2>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>User Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          <h3 style="color: #333;">Message:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee; white-space: pre-wrap;">${description}</div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact form email error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
