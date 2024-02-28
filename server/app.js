import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import RegistrationTokenRouter from './routers/RegistrationTokenRouter.js';
import UserAccountRouter from './routers/UserAccountRouter.js';
import OnboardingRouter from './routers/OnboardingRouter.js';
import VisaRouter from './routers/VisaRouter.js';
import UserProfileRouter from './routers/UserProfileRouter.js';
import HousingRouter from './routers/HousingRouter.js';
import FacilityReportRouter from './routers/FacilityReportRouter.js';
import AWSS3Router from './routers/AWSS3Router.js';

const app = express();
app.use(express.json());

// eslint-disable-next-line no-unused-vars
const __dirname = path.resolve();

// enable cors
app.use(
  cors({
    origin(origin, callback) {
      const allowedOrigins = ['http://localhost:4200', 'http://localhost:5173'];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // enable cookies for cors
  }),
);
// enable cookies for express
// app.use(cookieParser());

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
