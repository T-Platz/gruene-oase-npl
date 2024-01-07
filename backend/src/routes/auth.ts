import express, { Router, Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '../db/mongodb';

export type JwtPayload = { userId: string };

function generateAccessToken(payload: JwtPayload, logout: boolean): string {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET is empty');
    
    return sign(payload, process.env.JWT_SECRET, { expiresIn: logout ? '0s' : '2h' });
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
    const token = generateAccessToken(JwtPayload, false);
    res.cookie('jwt', token, {
        httpOnly: true, sameSite: 'strict', maxAge: 2 * 60 * 60 * 1000,
    });

    return res.send({
        id: user._id,
        email: user.email,
        auth: token
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
    const token = generateAccessToken(JwtPayload, false);
    res.cookie('jwt', token, {
        httpOnly: true, sameSite: 'strict', maxAge: 2 * 60 * 60 * 1000,
    });

    return res.send({
        id: newUser._id,
        email: newUser.email,
        auth: token
    });
});


authRouter.post('/logout', async (req: Request, res: Response) => {
    console.log('/auth/logout POST');

    // Check auth
    if (!req.auth)
        return res.sendStatus(403);

    // Check if user exists
    const user = await User.findById(req.auth.userId);
    if (!user)
        return res.sendStatus(404);

    // Send expired JWT token
    const JwtPayload: JwtPayload = { userId: user._id.toString() };
    const token = generateAccessToken(JwtPayload, true);
    res.cookie('jwt', token, {
        httpOnly: true, sameSite: 'strict', maxAge: 2 * 60 * 60 * 1000,
    });

    return res.send({
        id: user._id,
        email: user.email,
        auth: token
    });
});


authRouter.head('/verify', (req: Request, res: Response) => {
    // Used by clients to check if their token is valid (e.g. after opening
    // the website when a token was read from a cookie). Is protected by JWT
    // middleware, will only reach this if JWT token was valid.
    return res.send();
});
