import express, { Router, Request, Response } from 'express';

export const testRouter: Router = express.Router();

testRouter.get('/date', (req: Request, res: Response) => {
    console.log('/test/date GET');
    return res.send({
        date: (new Date()).toISOString()
    });
});

testRouter.post('/echo', async (req: Request, res: Response) => {
    console.log('/test/echo POST');
    
    console.log('Body: ', JSON.stringify(req.body));

    return res.send(req.body);
});
