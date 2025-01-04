import { Router } from 'express';
import { createProduct, getProducts, getProductsByCategory, updateProduct, deleteProduct, getProduct } from '../controllers/productController';
import { addProductToCart } from '../controllers/cartController';
import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/auth';

const router = Router();

router.post('/', isAuthenticated, isAdmin, createProduct);
router.post('/add-to-cart', isAuthenticated, addProductToCart);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/category/:category', getProductsByCategory);
router.put('/:id', isAuthenticated, isAdmin, updateProduct);
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct);

export default router;