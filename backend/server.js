require("dotenv").config({ path: "./.env" });

console.log("EMAIL:", process.env.GMAIL_USER);
console.log("PASS:", process.env.GMAIL_PASS);

const express    = require("express");
const cors       = require("cors");
const rateLimit  = require("express-rate-limit");
const nodemailer = require("nodemailer");

const app  = express();
const PORT = process.env.PORT || 3001;

// ── MIDDLEWARE ───────────────────────────────────────────────
app.use(express.json());

// CORS — allow your portfolio origin
app.use(cors({
  origin: [
    "http://127.0.0.1:5500",    // Live Server (VS Code)
    "http://localhost:5500",
    "http://localhost:3000",
    process.env.FRONTEND_URL,   // your Vercel domain
  ].filter(Boolean),
  methods: ["GET", "POST"],
}));

// Rate limit — max 5 emails per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many messages sent. Please try again in 15 minutes." },
});
app.use("/api/contact", limiter);

// ── NODEMAILER TRANSPORTER ────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASS, // Gmail App Password (16 chars)
  },
});

// Verify connection on startup
transporter.verify((err) => {
  if (err) {
    console.error("❌ Email transporter error:", err.message);
  } else {
    console.log("✅ Email transporter ready");
  }
});

// ── VALIDATION HELPER ─────────────────────────────────────────
function validate({ name, email, message }) {
  if (!name || name.trim().length < 2)
    return "Name must be at least 2 characters.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email address.";
  if (!message || message.trim().length < 10)
    return "Message must be at least 10 characters.";
  return null;
}

// ── ROUTES ────────────────────────────────────────────────────

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Riya Jain Portfolio API running 🚀" });
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate
  const error = validate({ name, email, message });
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    // Email TO you (notification)
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,  // sends to yourself
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

    // Auto-reply TO sender
    await transporter.sendMail({
      from:    `"Riya Jain" <${process.env.GMAIL_USER}>`,
      to:      "jainriya9705@gmail.com",
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
            <a href="https://www.linkedin.com/in/riya-jain-702b7b2b6/" style="color:#2dd4bf">LinkedIn</a>.
          </p>
          <hr style="border:none;border-top:1px solid #27272a;margin:28px 0"/>
          <p style="margin:0;font-size:12px;color:#52525b;font-family:monospace">
            Riya Jain · CSE Student, VIT Vellore · riya.jain2023a@vitstudent.ac.in
          </p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Message sent successfully!" });

  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send message. Please email me directly." });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`📬 Contact endpoint: POST http://localhost:${PORT}/api/contact\n`);
});

const path = require("path");

app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../riya-portfolio-arctic.html"));
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("New Contact Form Submission:");
  console.log(name, email, message);

  res.json({
    success: true,
    message: "Message received successfully 🚀",
  });
});