const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "itsaastha.2005@gmail.com",
    pass: "piss tobn nvas lrse", 
  },
});

module.exports = async function sendMail(to, subject, text) {
  await transporter.sendMail({
    from: "itsaastha.2005@gmail.com",
    to,
    subject,
    text,
  });
};
