import nodemailer from 'nodemailer';

export const sendEmail = async (from: string, name: string, subject: string, message: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: from,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: `Nombre: ${name}\nCorreo Electrónico: ${from}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
  };

  return transporter.sendMail(mailOptions);
};
