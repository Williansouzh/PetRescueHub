import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    });
  }

  public async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const info = await this.transporter.sendMail({
      from: '"PetRescue" <no-reply@yourapp.com>', // sender address
      to, // list of receivers
      subject: "Welcome to Our Service!", // Subject line
      text: `Hello ${name}, welcome to our service!`, // plain text body
      html: `<b>Hello ${name}</b>, welcome to our service!`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }
  public async sendTokenResetEmail(
    to: string,
    name: string,
    token: string
  ): Promise<void> {
    const info = await this.transporter.sendMail({
      from: '"PetRescue" <no-reply@yourapp.com>', // sender address
      to, // list of receivers
      subject: "Reset password!", // Subject line
      text:
        `You are receiving this because you requested a password reset.\n\n` +
        `Click the following link or paste it into your browser to complete the process:\n\n` +
        `http://localhost:3000/reset/${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`, // plain text body
      html:
        `<p>Hello <b>${name}</b>,</p>` +
        `<p>You are receiving this because you requested a password reset.</p>` +
        `<p>Click the following link or paste it into your browser to complete the process:</p>` +
        `<a href="http://localhost:3000/reset/${token}">Reset Password</a>` +
        `<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }
}
