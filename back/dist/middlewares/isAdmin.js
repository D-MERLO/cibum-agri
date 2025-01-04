"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const User_1 = require("../entities/User");
const database_1 = require("../config/database");
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Usuario no autenticado.' });
            return; // Termina la ejecución de la función
        }
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOne({ where: { id: req.user.id } });
        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
            return; // Termina la ejecución de la función
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: 'Error de servidor', error });
    }
});
exports.isAdmin = isAdmin;
