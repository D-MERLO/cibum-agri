// import { Request, Response } from 'express';
// import { User } from '../entities/User';

// import jwt from 'jsonwebtoken';

// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const user = User.create({ name, email, password, role: role || 'user' });
//     await user.hashPassword();
//     await user.save();
//     res.status(201).json({ message: 'Usuario registrado' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al registrar usuario', error });
//   }
// };

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOneBy({ email });

//     if (!user || !(await user.checkPassword(password))) {
//       return res.status(401).json({ message: 'Credenciales incorrectas' });
//     }

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
//       expiresIn: '1d',
//     });
//     res.json({ token, role: user.role });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al iniciar sesión', error });
//   }
// };

import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registro de Usuario
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        // Verifica si el usuario ya existe
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            res.status(400).json({ message: 'El usuario ya existe' });
            return;
        }

        // Crea un nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await userRepository.save(newUser);
        res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

// Inicio de Sesión
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });

        if (!user) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: '1d',
        });

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

// Funciones para obtener todos los usuarios y un usuario por ID se mantendrán iguales
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: Number(req.params.userId) });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
};
