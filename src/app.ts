import httpStatus from 'http-status';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

//using cors
app.use(cors());

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api/v1', router);

//test route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Working perfectly !!!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Working perfectly !!!',
      },
    ],
  });
});

//call global error handler
app.use(globalErrorHandler);

//handle not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
