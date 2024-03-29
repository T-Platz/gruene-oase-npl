import { OAuth2Client } from 'google-auth-library';
import * as nodemailer from 'nodemailer';
import { Report } from '../db/mongodb';
import { createHeader, createBody } from './utils';

class AuthClient {
    private static instance: AuthClient | null = null;
    private readonly oAuth2Client: OAuth2Client;

    private constructor() {
        this.oAuth2Client = new OAuth2Client(
            process.env.GMAIL_CLIENT_ID,
            process.env.GMAIL_CLIENT_SECRET,
            process.env.GMAIL_REDIRECT_URI
        );
        this.oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
    }

    public static getInstance(): AuthClient {
        if (!AuthClient.instance)
            AuthClient.instance = new AuthClient();
        return AuthClient.instance;
    }

    public getAccessToken() {
        return this.oAuth2Client.getAccessToken();
    }
}

export async function sendEmail(receiver: string, report: Report) {
    let accessToken;
    try {
        const authClient = AuthClient.getInstance();
        accessToken = await authClient.getAccessToken();
    } catch (e) {
        console.error('Failed to fetch email access token:', e);
        return;
    }

    let transport;
    try {
        transport = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.GMAIL_USER,
                clientId: process.env.GMAIL_CLIENT_ID,
                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                accessToken: accessToken
            }
        } as nodemailer.TransportOptions);
    } catch (e) {
        console.error('Failed to create nodemailer transport:', e);
        return;
    }

    let res;
    try {
        res = await transport.sendMail({
            from: `Grüne Oase <${process.env.GMAIL_USER}>`,
            to: receiver,
            subject: createHeader(report),
            text: createBody(report)
        });
    } catch (e) {
        console.error('Failed to send email:', e);
        return;
    }

    return res;
}
