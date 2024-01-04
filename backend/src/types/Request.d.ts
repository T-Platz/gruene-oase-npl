import { Request } from 'express';
import { JwtPayload } from '../routes/auth';

declare module 'express' {
    interface Request {
        auth?: JwtPayload;
    }
}
