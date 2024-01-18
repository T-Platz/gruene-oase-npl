import express, { Router, Request, Response } from 'express';
import { Lot, Report, User } from '../db/mongodb';
import { sendEmail } from '../notifications/email';

export const reportRouter: Router = express.Router();

reportRouter.post('/', async (req: Request, res: Response) => {
    console.log('/report POST');
    
    // Check if lot exists
    let lot;
    try {
        lot = await Lot.findOne({ nr: req.body.lotNr }).populate('owner');
    } catch (e) {
        console.error('Filed to fetch lot:', e);
        return res.sendStatus(500);
    }
    if (!lot)
        return res.sendStatus(404);

    // Create new report and store it in the database
    let report;
    try {
        report = new Report({
            timestamp: +new Date(),
            lotNr: req.body.lotNr,
            category: req.body.category,
            description: req.body.description,
            viewed: false
        });
        await report.save();
    } catch (e) {
        console.error('Failed to store report:', e);
        return res.sendStatus(500);
    }

    // Send HTTP response
    const response: Response = res.send(report);
    
    // Send an email if the user wants to recevie such
    const user = lot.owner as User;
    if (user.notify)
        sendEmail(user.email, report);

    return response;
});
