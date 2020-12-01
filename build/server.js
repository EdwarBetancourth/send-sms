"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// librerias
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
// rutas
const sms_route_1 = __importDefault(require("./routes/sms.route"));
// iniciar servidor api-rest
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    // configuración del servidor
    config() {
        this.app.set('port', process.env.PORT);
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    }
    // configuración rutas del servidor
    routes() {
        this.app.use('/sms', sms_route_1.default);
    }
    // iniciar el servicio
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server listening on port ' + this.app.get('port'));
        });
    }
}
dotenv_1.default.config();
const server = new Server();
server.start();
