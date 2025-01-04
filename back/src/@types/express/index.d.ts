import { User } from '../../entities/User';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Agrega `user` al objeto `Request`
    }
  }
}
