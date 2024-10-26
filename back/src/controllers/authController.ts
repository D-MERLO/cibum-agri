import { Request, Response } from 'express';
import User from '../entities/User';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = User.create({ name, email, password, role: role || 'user' });
    await user.hashPassword();
    await user.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOneBy({ email });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
