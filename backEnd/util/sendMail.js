
const nodemailer = require("nodemailer");
require("dotenv").config(); // If you're using .env

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: verify the connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email server not ready:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});


async function sendMail(to, subject, message) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
}

module.exports = sendMail;
