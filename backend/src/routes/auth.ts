import express, { Router, Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '../mongodb';

export type JwtPayload = { userId: string };

function generateAccessToken(payload: JwtPayload): string {
    if (!process.env.JWT_SECRET)
        throw new Error('JWT_SECRET is empty');
    
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export const authRouter: Router = express.Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    console.log('/auth/login POST');

    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(403).send('');

    const passwordhash: string = user.passwordhash;
    const valid = await compare(req.body.password, passwordhash);
    if (!valid)
        return res.status(403).send('');

    const JwtPayload: JwtPayload = { userId: user._id.toString() };
    return res.send({
        token: generateAccessToken(JwtPayload)
    });
});

authRouter.post('/register', async (req: Request, res: Response) => {
    console.log('/auth/register POST');

    const user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send('Username already taken');

    const passwordhash = await hash(req.body.password, 10);
    if (!passwordhash)
        return res.status(500).send('');

    const newUser = new User({
        email: req.body.email,
        passwordhash: passwordhash
    });
    newUser.save();

    return res.send(newUser);
});

authRouter.head('/verify', (req: Request, res: Response) => {
    // Used by clients to check if their token is valid (e.g. after opening the
    // website when a token was read from a cookie). Is protected by JWT
    // middleware, will only reach this if JWT token was valid.
    return res.send('');
});
