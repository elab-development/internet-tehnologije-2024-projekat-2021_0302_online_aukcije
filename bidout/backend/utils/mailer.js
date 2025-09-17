import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const mailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(mailConfig);

export const sendMail = async (options) => {
  if (!options.email) {
    throw new Error('No email found');
  }

  const message = {
    from: 'BidOut',
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(message);
};
