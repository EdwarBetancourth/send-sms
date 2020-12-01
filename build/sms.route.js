"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
dotenv_1.default.config();
const accountsID = String(process.env.ACCOUNT_SID);
const authToken = String(process.env.AUTH_TOKEN);
const client = twilio_1.default(accountsID, authToken);
client.messages.create({
    to: String(process.env.MY_PHONE),
    from: '+13305749043',
    body: 'Hola'
})
    .then(message => console.log(message.sid))
    .catch(error => console.error(error()));
