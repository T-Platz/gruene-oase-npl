import express, { Router, Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '../db/mongodb';

export type JwtPayload = { userId: string };

function generateAccessToken(payload: JwtPayload): string {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET is empty');
    
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export const authRouter: Router = express.Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    console.log('/auth/login POST');

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.sendStatus(403);

    // Compare password with what is stored in the database
    const passwordhash: string = user.passwordhash;
    const valid = await compare(req.body.password, passwordhash);
    if (!valid)
        return res.sendStatus(403);

    // Send JWT token
    const JwtPayload: JwtPayload = { userId: user._id.toString() };
    return res.send({
        token: generateAccessToken(JwtPayload)
    });
});

authRouter.post('/register', async (req: Request, res: Response) => {
    console.log('/auth/register POST');

    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user)
        return res.sendStatus(400);

    // Generate hash of password
    const passwordhash = await hash(req.body.password, 10);
    if (!passwordhash)
        return res.sendStatus(500);

    // Store user in database
    const newUser = new User({
        email: req.body.email,
        passwordhash: passwordhash,
        notify: req.body.notify
    });
    newUser.save();

    // Send JWT token
    const JwtPayload: JwtPayload = { userId: newUser._id.toString() };
    return res.send({
        token: generateAccessToken(JwtPayload)
    });
});

authRouter.head('/verify', (req: Request, res: Response) => {
    // Used by clients to check if their token is valid (e.g. after opening
    // the website when a token was read from a cookie). Is protected by JWT
    // middleware, will only reach this if JWT token was valid.
    return res.send();
});
