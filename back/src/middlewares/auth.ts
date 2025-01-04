import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(403).json({ message: 'Token no proporcionado. Por favor, inicia sesión.' });
        return; // Termina la ejecución de la función
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token no válido' });
            return; // Termina la ejecución de la función
        }
        req.user = decoded as any;
        next();
    });
};


