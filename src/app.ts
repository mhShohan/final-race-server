import cors from 'cors';
import express, { Application } from 'express';
import rootRoutes from '@/routes';
import notFound from '@/middlewares/notFound';
import globalErrorHandler from '@/middlewares/globalErrorhandler';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/v1', rootRoutes);

//Not Found Route
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
