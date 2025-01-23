import { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';

export const handleSendEmail = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  try {
    await sendEmail(email, name, subject, message);
    res.status(200).send('Correo enviado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el correo');
  }
};
