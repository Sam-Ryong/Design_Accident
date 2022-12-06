import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import featureRouter from './routers/featureRouter';
import mainRouter from './routers/mainRouter';
import dynamicRouter from './routers/dynamicRouter';

const app = express();
const logger = morgan('dev');

app.use(logger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.use('/', globalRouter);
app.use('/', userRouter);
app.use('/', featureRouter);
app.use('/', mainRouter);
app.use('/', dynamicRouter);

export default app;
