// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).json({ message: 'Acceso denegado' });

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
//     req.user = payload; // Guardar datos de usuario en req.user
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token inválido' });
//   }
// };

// export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   if (req.user.role !== 'admin') return res.status(403).json({ message: 'Acceso solo para administradores' });
//   next();
// };

// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ message: 'Token no proporcionado. Por favor, inicia sesión.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Token no válido' });
      }
      req.user = decoded; // Decodifica y adjunta el usuario autenticado al objeto req
      next();
    });
  };

// Middleware específico para verificar rol de administrador
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error de servidor', error });
  }
};
