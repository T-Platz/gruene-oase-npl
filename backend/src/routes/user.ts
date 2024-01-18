import express, { Router, Request, Response } from 'express';
import { User } from '../db/mongodb';

export const userRouter: Router = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
    console.log('/user GET');

    // Check auth
    if (!req.auth)
        return res.sendStatus(403);

    // Check if user exists
    let user;
    try {
        user = await User.findById(req.auth.userId).populate('lots');
    } catch (e) {
        console.error('Failed to fetch user:', e);
        res.sendStatus(500);
    }
    if (!user)
        return res.sendStatus(404);

    return res.send({ user: user });
});
