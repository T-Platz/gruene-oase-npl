import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
import { authRouter } from './src/routes/auth';
import { lotRouter } from './src/routes/lot';
import { userRouter } from './src/routes/user';
import { reportRouter } from './src/routes/report';
import { testRouter } from './src/routes/test';
import { connect } from './src/db/mongodb';

dotenv.config();
connect();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

if (process.env.JWT_SECRET) {
    app.use(expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
    }).unless({
        path: ['/auth/login', '/auth/register', '/report', '/test']
    }));
}

app.use('/auth', authRouter);
app.use('/lot', lotRouter);
app.use('/user', userRouter);
app.use('/report', reportRouter);
app.use('/test', testRouter);

app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
