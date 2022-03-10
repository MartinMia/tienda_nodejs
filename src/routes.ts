import { Application } from 'express';

// Import routes
import AlumnosRoutes from './routes/alumnos.routes';
import MateriasRoutes from './routes/materias.routes';
import PersonasRoutes from './routes/personas.routes';
import ProductosRoutes from './routes/productos.routes';
import VentasRoutes from './routes/ventas.routes'

export const registeredRoutes = async (app:Application) => {
  app.use('/api/alumnos', AlumnosRoutes);
  app.use('/api/materias', MateriasRoutes);
  app.use('/api/personas', PersonasRoutes);
  app.use('/api/productos', ProductosRoutes);
  app.use('/api/ventas', VentasRoutes);
};