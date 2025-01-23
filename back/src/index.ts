import express from 'express';
import dotenv from 'dotenv';
import {AppDataSource} from './config/database';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import userRoutes from './routes/userRoutes';
import emailRoutes from './routes/emailRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/emails', emailRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  })
  .catch((error) => console.log('Error al conectar a la base de datos:', error));

  