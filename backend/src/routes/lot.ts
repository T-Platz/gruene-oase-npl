import express, { Router, Request, Response } from 'express';
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import { Counter, Lot, Report, User } from '../db/mongodb';

async function getLotNrCount(): Promise<number> {
    // Fetch counter from database
    let counter;
    try {
        counter = await Counter.findOne();
    } catch (e) {
        console.error('Failed to fetch counter:', e);
        return 0;
    }

    if (!counter) {
        try {
            await (new Counter().save());
        } catch (e) {
            console.error('Failed to create new counter:', e);
            return 0;
        }
        return 0;
    }

    // Increment counter value and store back
    counter.count++;
    try {
        await counter.save();
    } catch (e) {
        console.error('Failed to store counter:', e);
        return 0;
    }

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
        return lotNr.padStart(4, '0');
    else
        return lotNr.toString().padStart(4, '0');
}

function lotNrsEqual(a: LotNr, b: LotNr): boolean {
    return lotNrToPaddedString(a) === lotNrToPaddedString(b);
}

async function sendLotSign(lotNr: LotNr, res: Response) {
    const mmToPx = 2.834645669291339;
    // Create PDF document
    const width = 70;
    const height = 50;
    const margin = 5;
    const pdf = new PDFDocument({
        size: [(width + 2*margin)*mmToPx, (height + 2*margin)*mmToPx],
    });
    pdf.scale(mmToPx);

    // Pipe the document to the express response
    res.setHeader('Content-Type', 'application/pdf');
    pdf.pipe(res);

    // Add Grüne Oase logo
    pdf.rect(margin, margin, width, 14).fill('#057038');
    pdf.image('src/assets/GrüneOaseLogoText.png', 20 + margin, 1 + margin, {
        height: 12
    });

    // Add QR code
    const qrCodeSize = 25;
    const qrCode = await QRCode.toDataURL(`http://gruene-oase-npl.de/report/${lotNr}`, {
        margin: 0
    });
    pdf.image(qrCode, 3*width/4 - qrCodeSize/2 + margin, height/2 - qrCodeSize/2 + 4 + margin, {
        width: qrCodeSize,
        height: qrCodeSize,
    });

    // Add some text on the side
    pdf.fontSize(4).fill('#057038');
    const lines = ['Brauchen diese', 'Pflanzen', 'Zuwendung?'];
    lines.forEach((line, i) => {
        const lineWidth = pdf.widthOfString(line);
        const lineHeight = pdf.heightOfString(line);
        pdf.text(line, width/4 - lineWidth/2 + margin, height/2 - lineHeight/2 + (i-1)*5 + 4 + margin);
    });

    // Add lot nr
    pdf.fontSize(5).fill('black');
    const lotNrStr = `Garten Nr. ${lotNrToPaddedString(lotNr)}`;
    const lotNrStrWidth = pdf.widthOfString(lotNrStr);
    const lotNrStrHeight = pdf.heightOfString(lotNrStr);
    pdf.text(lotNrStr, width/2 - lotNrStrWidth/2 + margin, height - lotNrStrHeight + margin);

    // Add border
    pdf.rect(margin, margin, width, height).lineWidth(0.3).stroke();

    // Return combined data
    pdf.end();
}

export const lotRouter: Router = express.Router();

lotRouter.get('/issues', async (req: Request, res: Response) => {
    console.log('/lot/issues GET');

    // Check auth
    if (!req.auth)
        return res.status(403).send();

    // Check if user exists
    let user;
    try {
        user = await User.findById(req.auth.userId).populate('lots');
    } catch (e) {
        console.error('Failed to fetch user:', e);
        return res.sendStatus(500);
    }
    if (!user)
        return res.sendStatus(404);

    // Check if user owns lot
    const lotNr = req.query.lotNr as string;
    if (!lotNr || !user.lots.some(lot => lotNrsEqual((lot as Lot).nr, lotNr)))
        return res.sendStatus(403);

    // Find number of new reports
    let issues;
    try {
        issues = await Report.countDocuments({ lotNr: lotNr, viewed: false });
    } catch (e) {
        console.error('Failed to count issues:', e);
        return res.sendStatus(500);
    }
    return res.send({ issues: issues });
});

lotRouter.get('/reports', async (req: Request, res: Response) => {
    console.log('/lot/reports GET');

    // Check auth
    if (!req.auth)
        return res.sendStatus(403);

    // Check if user exists
    let user;
    try {
        user = await User.findById(req.auth.userId).populate('lots');
    } catch (e) {
        console.error('Failed to fetch user:', e);
        return res.sendStatus(500);
    }
    if (!user)
        return res.sendStatus(404);

    // Check if user owns lot
    const lotNr = req.query.lotNr as string;
    if (!lotNr || !user.lots.some(lot => lotNrsEqual((lot as Lot).nr, lotNr)))
        return res.sendStatus(403);

    // Find and send all reports for this lot
    let reports;
    try {
        reports = await Report.find({ lotNr: lotNr });
    } catch (e) {
        console.error('Failed to fetch reports:', e);
        res.sendStatus(500);
    }
    return res.send({ reports: reports });
});

lotRouter.get('/sign', async (req: Request, res: Response) => {
    console.log('/lot/sign GET');

    // Check auth
    if (!req.auth)
        return res.sendStatus(403);

    // Check if user exists
    let user;
    try {
        user = await User.findById(req.auth.userId).populate('lots');
    } catch (e) {
        console.error('Failed to fetch user:', e);
        return res.sendStatus(500);
    }
    if (!user)
        return res.sendStatus(404);

    // Check if user owns lot
    const lotNr = req.query.lotNr as string;
    if (!lotNr || !user.lots.some(lot => lotNrsEqual((lot as Lot).nr, lotNr)))
        return res.sendStatus(403);

    // Generate pdf
    try {
        await sendLotSign(lotNr, res);
    } catch (e) {
        console.error('Failed to generate lot sign:', e);
        return res.sendStatus(500);
    }
});

lotRouter.post('/', async (req: Request, res: Response) => {
    console.log('/lot POST');

    // Check auth
    if (!req.auth)
        return res.sendStatus(403);

    // Check if user exists
    let user;
    try {
        user = await User.findById(req.auth.userId);
    } catch (e) {
        console.error('Failed to fetch user:', e);
        return res.sendStatus(500);
    }
    if (!user)
        return res.sendStatus(404);


    // Create a new lot and add it to the user in the database
    const lotNr = generateLotNr(await getLotNrCount());
    let lot;
    try {
        lot = new Lot({
            nr: lotNr,
            owner: user._id,
            garden: req.body.garden,
            name: req.body.name,
            timestamp: +new Date()
        });
        await lot.save();
        user.lots.push(lot._id);
        await user.save();
    } catch (e) {
        console.error('Failed to store lot:', e);
        return res.sendStatus(500);
    }

    return res.send({ lot: lot });
});

lotRouter.post('/view', async (req: Request, res: Response) => {
    console.log('/lot/view POST');

    // Check auth
    if (!req.auth)
        return res.sendStatus(403);

    // Check if user exists
    let user;
    try {
        user = await User.findById(req.auth.userId).populate('lots');
    } catch (e) {
        console.error('Failed to fetch user:', e);
        return res.sendStatus(500);
    }
    if (!user)
        return res.sendStatus(404);

    // Check if user owns lot
    const lotNr = req.query.lotNr as string;
    if (!lotNr || !user.lots.some(lot => lotNrsEqual((lot as Lot).nr, lotNr)))
        return res.sendStatus(403);

    // Set the viewed boolean for all reports to true
    try {
        await Report.updateMany({
            lotNr: req.query.lotNr,
            viewed: false
        }, {
            $set: { viewed: true }
        });
    } catch (e) {
        console.error('Failed to update reports:', e);
        return res.sendStatus(500);
    }

    return res.send();
});
