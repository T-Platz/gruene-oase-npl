import express, { Router, Request, Response } from 'express';
import { Lot, User, Report } from '../mongodb';
import { JwtPayload } from './auth';

export const lotRouter: Router = express.Router();

lotRouter.get('/', async (req: Request, res: Response) => {
    console.log('/lot GET');

    const auth = req.auth as JwtPayload;
    const user = await User.findById(auth.userId);
    if (!user)
        return res.status(404).send('');

    const lotId = req.query.lotId;
    if (!user.lots.some(lot => lot._id.toString() === lotId))
        return res.status(403).send('');

    const reports = await Report.find({ lotId: lotId });
    return res.send(reports);
});

lotRouter.post('/', async (req: Request, res: Response) => {
    console.log('/lot POST');

    const auth = req.auth as JwtPayload;
    const user = await User.findById(auth.userId);
    if (!user)
        return res.status(404).send('');

    const lot = new Lot();
    user.lots.push(lot);
    await user.save();

    return res.send(lot);
});
