import { Application } from 'express';

// Import routes
import ProductosRoutes from './routes/productos.route';

export const registeredRoutes = async (app:Application) => {
  app.use('/api/productos', ProductosRoutes);
};