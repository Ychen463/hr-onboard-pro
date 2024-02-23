import express from 'express';
import cors from 'cors';
// import cookieParser from "cookie-parser";
import morgan from 'morgan';

// import routers
// import UserRouter from "./routers/UserRouter.js";
// import BrandRouter from "./routers/BrandRouter.js";
// import TypeRouter from "./routers/TypeRouter.js";
// import ProductRouter from "./routers/ProductRouter.js";

const app = express();

// enable cors
app.use(
  cors({
    origin: 'http://localhost:3000',
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
// app.use("/user", UserRouter);
// app.use("/brands", BrandRouter);
// app.use("/types", TypeRouter);
// app.use("/products", ProductRouter);

app.all('*', (_req, res) => {
  console.log('Wrong route!');
  return res.redirect('/404page.html');
});

export default app;
