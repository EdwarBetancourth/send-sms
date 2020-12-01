// librerias
import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';

// rutas
import sms from './routes/sms.route';

// iniciar servidor api-rest
class Server {
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    // configuración del servidor
    config(): void{
        this.app.set('port', process.env.PORT);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    // configuración rutas del servidor
    routes(): void{
        this.app.use('/sms', sms);
    }
    
    // iniciar el servicio
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('server listening on port ' + this.app.get('port'));
        })
    }
}

dotenv.config();
const server = new Server();
server.start();