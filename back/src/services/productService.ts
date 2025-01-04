import { AppDataSource } from '../config/database';
import { Product } from '../entities/Product';

export class ProductService {
    private productRepository = AppDataSource.getRepository(Product);  // Obtén el repositorio

    async createProduct(productData: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(productData);
        return await this.productRepository.save(newProduct);
    }

    async getProductById(productId: number): Promise<Product | null> {
        return await this.productRepository.findOneBy({ id: productId });
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        return await this.productRepository.find({ where: { category } });
    }

    async getAllProducts(): Promise<Product[]> {  // Nueva función para obtener todos los productos
        return await this.productRepository.find();
    }

    async updateProduct(productId: number, productData: Partial<Product>): Promise<Product | null> {
        await this.productRepository.update(productId, productData);
        return await this.productRepository.findOneBy({ id: productId });
    }

    async deleteProduct(productId: number): Promise<void> {
        await this.productRepository.delete(productId);
    }
}

