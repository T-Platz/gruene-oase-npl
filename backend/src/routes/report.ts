import express, { Router, Request, Response } from 'express';
import { Report } from '../mongodb';

export const reportRouter: Router = express.Router();

reportRouter.post('/', async (req: Request, res: Response) => {
    console.log('/report POST');

    console.log('req: ', JSON.stringify(req.body));

    const report = new Report({
        timestamp: +new Date(),
        lotId: req.body.lotId,
        categoryId: req.body.categoryId,
        description: req.body.description
    });
    await report.save();

    return res.send(report);
});
