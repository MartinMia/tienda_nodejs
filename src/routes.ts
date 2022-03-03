import { Application } from 'express';

// Import routes
import AlumnosRoutes from './routes/alumnos.routes';
import PersonasRoutes from './routes/personas.routes';
import ProductosRoutes from './routes/productos.routes';

export const registeredRoutes = async (app:Application) => {
  app.use('/api/alumnos', AlumnosRoutes);
  app.use('/api/personas', PersonasRoutes);
  app.use('/api/productos', ProductosRoutes);
};