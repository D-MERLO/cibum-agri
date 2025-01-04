import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../config/database';

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Usuario no autenticado.' });
            return; // Termina la ejecución de la función
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: req.user.id } });

        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
            return; // Termina la ejecución de la función
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error de servidor', error });
    }
};

