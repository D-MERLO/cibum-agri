"use strict";
// import { Request, Response } from 'express';
// import { User } from '../entities/User';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.login = exports.register = void 0;
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Registro de Usuario
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        // Verifica si el usuario ya existe
        const existingUser = yield userRepository.findOneBy({ email });
        if (existingUser) {
            res.status(400).json({ message: 'El usuario ya existe' });
            return;
        }
        // Crea un nuevo usuario
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        yield userRepository.save(newUser);
        res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
});
exports.register = register;
// Inicio de Sesión
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOneBy({ email });
        if (!user) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Credenciales incorrectas' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.json({ token, role: user.role });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
});
exports.login = login;
// Funciones para obtener todos los usuarios y un usuario por ID se mantendrán iguales
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const users = yield userRepository.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOneBy({ id: Number(req.params.userId) });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
});
exports.getUserById = getUserById;
