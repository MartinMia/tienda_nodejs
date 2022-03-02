import { Application } from 'express';

// Import routes
import PersonasRoutes from './routes/personas.routes'
import ProductosRoutes from './routes/productos.routes';

export const registeredRoutes = async (app:Application) => {
  app.use('/api/personas', PersonasRoutes);
  app.use('/api/productos', ProductosRoutes);
};