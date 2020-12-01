"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
class Sms {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/:number', this.sendSms);
    }
    sendSms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { number } = req.params;
            const accountsID = String(process.env.ACCOUNT_SID);
            const authToken = String(process.env.AUTH_TOKEN);
            const client = twilio_1.default(accountsID, authToken);
            yield client.messages.create({
                to: String(number),
                from: '+13305749043',
                body: 'Hola'
            })
                .then(message => res.send(message.sid))
                .catch(error => res.send(error));
        });
    }
}
dotenv_1.default.config();
const sms = new Sms();
exports.default = sms.router;
