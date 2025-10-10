import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
});

const sendMail = async (to, otp, text) => {
   await transporter.sendMail({
       from: process.env.GMAIL_USER,
       to: to,
       subject: "Reset your password",
       html: `<p>Your OTP for Password Reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
   });
};

export default sendMail;
