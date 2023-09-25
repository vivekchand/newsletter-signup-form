import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export async function POST(request) {
  try {
    const { email } = await request.json();

    const transporter = createTransport({
      service: "icloud",
      host: "smtp.mail.me.com",
      port: 587,
      auth: {
        user: process.env.NEXT_PUBLIC_SENDER,
        pass: process.env.NEXT_PUBLIC_KEY,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_SENDER,
      to: email,
      subject: "Welcome to Our Newsletter",
      html: `<p>Thank you for subscribing to our newsletter!</p>`,
    };

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !isValidEmail.test(email)) {
      return NextResponse.json({ message: "Invalid email!" }, { status: 400 });
    }

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        message: "mail Sent Successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to send email!",
        error: error.toString(),
      },
      { status: 500 }
    );
  }
}
