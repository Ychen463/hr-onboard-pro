import nodemailer from 'nodemailer';

const sendEmail = async ({ toEmail, subject, htmlBody }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Chooki HR Team" <bfrnbteam@gmail.com>',
      to: toEmail,
      subject,
      html: htmlBody,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email: ', error);
    throw error;
  }
};

export default sendEmail;
