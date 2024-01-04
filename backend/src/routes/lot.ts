import express, { Router, Request, Response } from 'express';
import { Counter, Lot, Report, User } from '../db/mongodb';

async function getLotNrCount(): Promise<number> {
    // Fetch counter from database
    const counter = await Counter.findOne();
    if (!counter) {
        await (new Counter().save());
        return 0;
    }

    // Increment counter value and store back
    counter.count++;
    await counter.save();

    return counter.count;
}

function generateLotNr(i: number): number {
    const base = 2671;
    const inc = 3947;
    const mod = 10000;
    return (base + inc * i) % mod;
}

type LotNr = string | number;

function lotNrToPaddedString(lotNr: LotNr): string {
    if (typeof lotNr === 'string')
        return lotNr.padStart(5, '0');
    else
        return lotNr.toString().padStart(5, '0');
}

function lotNrsEqual(a: LotNr, b: LotNr): boolean {
    return lotNrToPaddedString(a) === lotNrToPaddedString(b);
}

export const lotRouter: Router = express.Router();

lotRouter.get('/issues', async (req: Request, res: Response) => {
    console.log('/lot/issues GET');

    // Check auth
    if (!req.auth)
        return res.status(403).send();

    // Check if user exists
    const user = await User.findById(req.auth.userId).populate('lots');
    if (!user)
        return res.sendStatus(404);

    // Check if user owns lot
    const lotNr = req.query.lotNr as string;
    if (!lotNr || !user.lots.some(lot => lotNrsEqual((lot as Lot).nr, lotNr)))
        return res.sendStatus(403);

    // Find number of new reports
    const issues = await Report.countDocuments({ lotNr: lotNr, viewed: false });
    return res.send({ issues: issues });
});

lotRouter.get('/reports', async (req: Request, res: Response) => {
    console.log('/lot/reports GET');

    // Check auth
    if (!req.auth)
        return res.sendStatus(403);

    // Check if user exists
    const user = await User.findById(req.auth.userId).populate('lots');
    if (!user)
        return res.sendStatus(404);

    // Check if user owns lot
    const lotNr = req.query.lotNr as string;
    if (!lotNr || !user.lots.some(lot => lotNrsEqual((lot as Lot).nr, lotNr)))
        return res.sendStatus(403);

    // Find and send all reports for this lot
    const reports = await Report.find({ lotNr: lotNr });
    return res.send({ reports: reports });
});

lotRouter.post('/', async (req: Request, res: Response) => {
    console.log('/lot POST');

    // Check auth
    if (!req.auth)
        return res.sendStatus(403);

    // Check if user exists
    const user = await User.findById(req.auth.userId);
    if (!user)
        return res.sendStatus(404);

    // Create a new lot and add it to the user in the database
    const lotNr = generateLotNr(await getLotNrCount());
    const lot = new Lot({
        nr: lotNr,
        owner: user._id,
        name: req.body.name,
        timestamp: +new Date()
    });
    await lot.save();
    user.lots.push(lot._id);
    await user.save();

    return res.send({ lot: lot });
});

lotRouter.post('/view', async (req: Request, res: Response) => {
    console.log('/lot/view POST');

    // Check auth
    if (!req.auth)
        return res.sendStatus(403);

    // Check if user exists
    const user = await User.findById(req.auth.userId).populate('lots');
    if (!user)
        return res.sendStatus(404);

    // Check if user owns lot
    const lotNr = req.query.lotNr as string;
    if (!lotNr || !user.lots.some(lot => lotNrsEqual((lot as Lot).nr, lotNr)))
        return res.sendStatus(403);

    // Set the viewed boolean for all reports to true
    await Report.updateMany({
        lotNr: req.body.lotNr,
        viewed: false
    }, {
        $set: { viewed: true }
    });

    return res.send();
});
