import cors from 'cors';
import express, { Application } from 'express';
import rootRoutes from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import morgan from 'morgan';

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: ['https://bsmrstu-8100.vercel.app', 'http://localhost:5173'] }));

// application routes
app.use('/api/v1', rootRoutes);

//Not Found Route
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
