import { Router } from 'express';
import { getUserById, getAllUsers, register, login } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/auth';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', isAuthenticated, isAdmin, getAllUsers);
router.get('/:userId', isAuthenticated, isAdmin, getUserById);

export default router;
