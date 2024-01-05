import express, { Router, Request, Response } from 'express';
import { sendEmail } from '../notifications/email';
import { Report, ReportCategory } from '../db/mongodb';

export const testRouter: Router = express.Router();

testRouter.post('/email', async (req: Request, res: Response) => {
    console.log('/test/email POST');
    
    const report = new Report({
        lotNr: 1234,
        timestamp: 1704465199,
        category: ReportCategory.WATER,
        description: '',
        viewed: false
    });
    sendEmail('', report);

    return res.send();
});
