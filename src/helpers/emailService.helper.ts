import * as nodemailer from 'nodemailer';

export class EmailService {
  private generateMailOptions(userMail: string): object {
    return {
      from: process.env.EMAIL_USER,
      to: userMail,
      subject: 'Reset Password',
      text: `Reset your password by clicking this link: http://localhost:3000/reset-password/.`,
    };
  }

  private async createTransport(): Promise<nodemailer.Transporter> {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  public async senMail(userMail: string): Promise<void> {
    const mailOptions = this.generateMailOptions(userMail);
    const transport = await this.createTransport();

    await transport.sendMail(mailOptions);
  }
}
