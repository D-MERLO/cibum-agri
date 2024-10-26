import { Router } from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct, getProductById, getProductsByCategory } from '../controllers/productController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { addProductToCart } from '../controllers/cartController'; // Supongamos que este controlador gestiona el carrito
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, adminMiddleware, createProduct);
router.post('/add-to-cart', verifyToken, addProductToCart); // Solo usuarios logueados pueden agregar al carrito
router.get('/', getProducts);
router.get('/:id', getProductById); 
router.get('/category/:category', getProductsByCategory);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

export default router;








