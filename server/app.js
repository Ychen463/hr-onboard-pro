/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import RegistrationTokenRouter from './routers/RegistrationTokenRouter.js';
import UserAccountRouter from './routers/UserAccountRouter.js';
import OnboardingRouter from './routers/OnboardingRouter.js';
import VisaRouter from './routers/VisaRouter.js';
import UserProfileRouter from './routers/UserProfileRouter.js';
import HousingRouter from './routers/HousingRouter.js';
import FacilityReportRouter from './routers/FacilityReportRouter.js';
import AWSS3Router from './routers/AWSS3Router.js';

const app = express();

// eslint-disable-next-line no-unused-vars
const __dirname = path.resolve();

// enable cors
app.use(
  cors({
    origin(origin, callback) {
      const allowedOrigins = ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:5173'];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // enable cookies for cors
  }),
  helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
})
);

// Set limit for Request, every user can only request 100 times in a minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // one minute
  max: 100, // Max Requests
  message: 'Too many requests from this IP, please try again later.',
});

// 应用速率限制到所有请求
app.use(limiter);

// enable json and urlencoded for express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enable morgan for logging
app.use(morgan(':method :url :status :response-time ms'));
// enable static files
// app.use(express.static("views"));

// set routes
app.use('/api/registrationToken', RegistrationTokenRouter);
app.use('/api', UserAccountRouter);
app.use('/api', OnboardingRouter);
app.use('/api', HousingRouter);
app.use('/api/visa', VisaRouter);
app.use('/api', UserProfileRouter);
app.use('/api', FacilityReportRouter);
app.use('/api/awss3', AWSS3Router);
// app.use("/types", TypeRouter);
// app.use("/products", ProductRouter);

app.all('*', (_req, res) => {
  console.log('Wrong route!');
  return res.redirect('/404page.html');
});

export default app;
