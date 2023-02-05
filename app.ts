import express from "express";
import bodyParser from "body-parser";
import Controllers from "./interfaces/controllers.js";
import * as swagger from 'swagger-express-ts';
import swaggerUiDist from 'swagger-ui-dist'
import {readFileSync} from "fs";


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
            .get('/',(req: express.Request, res : express.Response) => {
                res.status(200).send("Thank you for come to this application.")
            })

    }

    private initializeSwagger() {
        this.app.use(swagger.express({
            definition:{
                info:{
                    version: "1.0",
                    description: "This is the API documentation from Web backend service based on the NodeJS Framework of JS language. This service is going to help you find out weather forecast.",
                    title: "Weather Teller Web API"
                },
                externalDocs:{
                    url: process.env.HOST ? `http://${process.env.HOST}:${this.port}` : 'https://weatherapp-79s8.onrender.com'
                }
            }
        })
            .use('/api-docs/swagger', express.static('server/assets/swagger'))
            .use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'))
        )
        let path = swaggerUiDist.absolutePath();
        let content = readFileSync(`${path}/swagger-initializer.js`).toString().replace("https://petstore.swagger.io/v2/swagger.json",
            process.env.HOST ? `http://${process.env.HOST}:${this.port}/api-docs/swagger.json` : 'https://weatherapp-79s8.onrender.com/api-docs/swagger.json')
    }

    public listen(): void {
        this.app.listen(this.port,() => {
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
