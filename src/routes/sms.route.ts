import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import twilio from "twilio";

class Sms {
    
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/:number', this.sendSms);
    }

    async sendSms(req: Request, res: Response) {
        const { number } = req.params;
        const accountsID: string = String(process.env.ACCOUNT_SID);
        const authToken: string = String(process.env.AUTH_TOKEN);

        const client = twilio(accountsID, authToken);

        await client.messages.create({
            to: String(number),
            from: '+13305749043',
            body: 'Hola'
        })
            .then(message => res.send(message.sid))
            .catch(error => res.send(error));
    }
}

dotenv.config();
const sms = new Sms();
export default sms.router;