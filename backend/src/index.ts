import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
import { authRouter } from './routes/auth';
import { lotRouter } from './routes/lot';
import { userRouter } from './routes/user';
import { reportRouter } from './routes/report';
import { connect } from './db/mongodb';

dotenv.config();
connect();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend URL
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
}));
app.use(express.json());

if (process.env.JWT_SECRET) {
    app.use(expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
    }).unless({
        path: ['/auth/login', '/auth/register', '/report', '/test/email']
    }));
}

app.use('/auth', authRouter);
app.use('/lot', lotRouter);
app.use('/user', userRouter);
app.use('/report', reportRouter);

app.listen(port, () => console.log(`Backend server running on port ${port}`));
