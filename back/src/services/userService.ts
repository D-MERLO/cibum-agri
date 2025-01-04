import { User } from '../entities/User';
import { AppDataSource } from '../config/database';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  // Registro de usuario
  async register(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    await user.hashPassword(); // Encripta la contraseña
    return this.userRepository.save(user);
  }

  // Inicio de sesión de usuario
  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && await user.checkPassword(password)) {
      return user;
    }
    return null;
  }

  // Buscar usuario por correo electrónico
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Obtener todos los usuarios (solo para administradores)
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Obtener un usuario específico por su ID (solo para administradores)
  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
