import express from "express";
import Controllers from "../interfaces/controllers.js";
import ProfileService from "../services/ProfileService.js";
import {ApiOperationGet, ApiOperationPost, ApiPath} from "swagger-express-ts";
import Profile from "../models/Profile.js";


@ApiPath({
    description: "Controller that allows to communicate using username",
    path:"/profiles",
    name:"Profiles"

})
class ProfileController implements Controllers {
    private path : string = '/profiles';
    private readonly router : express.Router;
    private service : ProfileService;

    // @ts-ignore
    @ApiOperationPost({
        parameters: {
            query: {
                "username": {
                    name:"username",
                    description: "Simple name of the user",
                    required: true
                },
              /*  "city_name": {
                    name:"city name",
                    description: "A simple name of the target city",
                    required: true
                },*/
            }
        },
        responses: {
            200: {}
        }
    })

    private saveUserNameCity = async (req: express.Request, res : express.Response) => {
        this.service.saveProfileNameCity(req).then((list: Profile) => {
            res.setHeader('Content-Type', 'application/json')

          // @ts-ignore
              list.acknowledged ? res.status(201).json({id: list.insertedId})
                  //@ts-ignore
                  : res.status(500).json(list.errmsg || 'Unexpected behavior occurred during creation.')

        });
    }
   // @ts-ignore
    @ApiOperationGet({
        parameters: {
            query: {
                "username": {
                    name:"username",
                    description: "Simple name of the user",
                    required: true
                }
            }
        },
        responses: {
            200: {}
        }
    })
   private getUserByName = async (req: express.Request, res: express.Response ) => {
       this.service.getProfileByUserName(req).then(record => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(record);
        });
    }

    public constructor() {
        this.router =  express.Router();
        this.setRoutes();
        this.service = new ProfileService();
    }

    private setRoutes() {
        this.router.get(`${this.path}?:username`, this.getUserByName);
        this.router.post(`${this.path}?:username`, this.saveUserNameCity);
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export default ProfileController
