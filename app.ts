import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import Controllers from "./interfaces/controllers.js";
import * as swagger from 'swagger-express-ts';
import swaggerUiDist from 'swagger-ui-express'
import fetch from "node-fetch";
import AuthController from "./controllers/auth/Auth.js";


class WeatherApplication {
    private app: express.Application;
    private readonly port: number;

    constructor(controllers: Controllers[], port: number) {
        this.app = express();
        this.port = port;
        this.initializeMiddleWare()
        this.initializeSwagger()
        this.initializeControllers(controllers)
    }

    private initializeMiddleWare() {
        this.app
            .use(bodyParser.json())
            .use(express.urlencoded({extended: true}))
            .get('/', (req: express.Request, res: express.Response) => {
                res.status(401).send("You're not authorized. Please use /login to logged in");
            })

    }

    private initializeSwagger() {
        this.app.use(swagger.express({
            definition: {
                securityDefinitions: {
                    oauth2:{
                        type: "oauth2",
                    }
                },
                info: {
                    version: "1.0",
                    description: "This is the API documentation from Web backend service based on the NodeJS Framework of JS language. This service is going to help you find out weather forecast.",
                    title: "Weather Teller Web API"
                },
                schemes: [ process.env.HOST ? 'HTTP' : 'HTTPS'],
                host: process.env.HOST ? `${process.env.HOST}:${this.port}` : 'weatherapp-79s8.onrender.com',
            }
        }))
        this.initSwaggerUI()
    }

    private async initSwaggerUI() {
        let swaggerFileName = (process.env.HOST ? `http://${process.env.HOST}:${this.port}` : 'https://weatherapp-79s8.onrender.com') + '/api-docs/swagger.json';
        let json
        await fetch(swaggerFileName).then(res =>  res.json()).then( data => json = data);

        this.app
            .use('/api-docs/', swaggerUiDist.serve, swaggerUiDist.setup(json))
            .use((err:Response, req :Request, res: Response, next: NextFunction)=> {
                err.statusCode = err.statusCode || 500;
                err.statusMessage = err.statusMessage || "Internal Service Error";
                res.status(err.statusCode).json({
                    message: err.statusMessage
                })
            })

    }

    public listen(): void {
        this.app.listen(this.port, () => {
                console.log(`Application listens on port ${this.port}`)
            }
        );
    }

    private initializeControllers(controllers: Controllers[]) {
        controllers.forEach(controller => {
            this.app.use(controller.getRouter())
        })
    }
}


export default WeatherApplication;
