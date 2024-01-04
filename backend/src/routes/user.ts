import express, { Router, Request, Response } from 'express';
import { User } from '../db/mongodb';

export const userRouter: Router = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
    console.log('/user GET');

    // Check auth
    if (!req.auth)
        return res.status(403).send();

    // Check if user exists
    const user = await User.findById(req.auth.userId).populate('lots');
    if (!user)
        return res.status(404).send();

    return res.send({ user: user });
});

userRouter.patch('/', async (req: Request, res: Response) => {
    console.log('/user PATCH');

    // Check auth
    if (!req.auth)
        return res.status(403).send();

    // Check if user exists
    const user = await User.findById(req.auth.userId).populate('lots');
    if (!user)
        return res.status(404).send();

    // Todo: Update user here

    return res.send({ user: user });
});
