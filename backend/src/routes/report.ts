import express, { Router, Request, Response } from 'express';
import { Lot, Report, User } from '../db/mongodb';
//import { sendEmail } from '../notifications/email';

export const reportRouter: Router = express.Router();

reportRouter.post('/', async (req: Request, res: Response) => {
    // Check if lot exists
    const lot = await Lot.findOne({ nr: req.body.lotNr }).populate('owner');
    if (!lot)
        return res.status(404).send();

    // Create new report and store it in the database
    const report = new Report({
        timestamp: +new Date(),
        lotNr: req.body.lotNr,
        category: req.body.category,
        description: req.body.description,
        viewed: false
    });
    await report.save();

    // Send HTTP response
    const response: Response = res.send(report);
    
    // Send an email if the user wants to recevie such
    //const user = lot.owner as User;
    //if (user.notify)
    //    sendEmail(user.email, report);

    return response;
});
