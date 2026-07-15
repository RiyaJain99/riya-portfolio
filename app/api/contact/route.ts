import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters."),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = parsed.data;

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;

  if (!gmailUser || !gmailPass) {
    console.error("Contact form: GMAIL_USER/GMAIL_PASS env vars are not set.");
    return NextResponse.json(
      { error: "Message could not be sent right now. Please email directly." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `[Portfolio] ${subject || "New Message"} — from ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:12px">
          <h2 style="color:#0f766e;margin:0 0 24px">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#666;width:100px;font-size:13px">From</td>
              <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;font-weight:600">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:13px">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #e5e5e5"><a href="mailto:${email}" style="color:#0f766e">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:13px">Subject</td>
              <td style="padding:10px 0;border-bottom:1px solid #e5e5e5">${subject || "—"}</td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#fff;border-radius:8px;border-left:3px solid #2dd4bf">
            <p style="margin:0;color:#333;line-height:1.7;white-space:pre-wrap">${message}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#999">
            Sent from your portfolio · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"Riya Jain" <${gmailUser}>`,
      to: email,
      subject: `Got your message, ${name.split(" ")[0]}! 👋`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#09090b;border-radius:12px;color:#f4f4f5">
          <h2 style="color:#2dd4bf;margin:0 0 20px;font-size:22px">Hey ${name.split(" ")[0]}, thanks for reaching out!</h2>
          <p style="color:#a1a1aa;line-height:1.75;margin:0 0 16px">
            I received your message and will get back to you as soon as possible — usually within 24–48 hours.
          </p>
          <div style="padding:16px 20px;background:#141416;border-radius:8px;border-left:3px solid #2dd4bf;margin:24px 0">
            <p style="margin:0;color:#52525b;font-size:12px;font-family:monospace;letter-spacing:.05em">YOUR MESSAGE</p>
            <p style="margin:8px 0 0;color:#a1a1aa;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</p>
          </div>
          <p style="color:#a1a1aa;line-height:1.75;margin:0">
            In the meantime, feel free to check out my work on
            <a href="https://github.com/RiyaJain99" style="color:#2dd4bf">GitHub</a> or connect on
            <a href="https://www.linkedin.com/in/riya-jain" style="color:#2dd4bf">LinkedIn</a>.
          </p>
          <hr style="border:none;border-top:1px solid #27272a;margin:28px 0"/>
          <p style="margin:0;font-size:12px;color:#52525b;font-family:monospace">
            Riya Jain · CSE (IoT), VIT Vellore
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact form email error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please email me directly." },
      { status: 500 },
    );
  }
}
