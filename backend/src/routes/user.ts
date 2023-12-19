import express, { Router, Request, Response } from 'express';
import { User } from '../mongodb';
import { JwtPayload } from './auth';

export const userRouter: Router = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
    console.log('/user GET');
    
    const auth = req.auth as JwtPayload;
    const user = await User.findById(auth.userId);
    if (!user)
        return res.status(404).send('');

    return res.send(user);
});

userRouter.patch('/', async (req: Request, res: Response) => {
    console.log('/user PATCH');
    
    const auth = req.auth as JwtPayload;
    const user = await User.findById(auth.userId);
    if (!user)
        return res.status(404).send('');

    // Todo: Update user here

    return res.send(user);
});
