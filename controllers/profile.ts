import express from "express";
import Controllers from "../interfaces/controllers.js";
import ProfileService from "../services/ProfileService.js";
import {
    ApiOperationDelete,
    ApiOperationGet,
    ApiOperationPost,
    ApiOperationPut,
    ApiPath
} from "swagger-express-ts";
import Profile from "../models/Profile.js";
import Validator from "../validators/validators.js";
import Validators from "../validators/validators.js";
import {Types} from "mongoose";


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
            },
            body:{model:'Profile'}
        },
        responses: {
            200: {}
        }
    })

    private saveUserNameCity = async (req: express.Request, res : express.Response) => {
        Validators.validateUserName()
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
            path: {
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
        if (!req.query.username){
            res.status(428).json({message: "Usernamefield can't be empty"})
            return
        }
       this.service.getProfileByUserName(req).then(record => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(record);
        });
    }

    // @ts-ignore
    @ApiOperationPut({
        parameters: {
            query: {
                "id": {
                    name:"id",
                    description: "An Id of the Profile User",
                    required: true
                },
            },
            body:{model:'Profile', required: true}
        },
        responses: {
            200: {}
        }
    })

    private updateUserNameCity = async (req: express.Request, res : express.Response) => {
        try {
            //@ts-ignore
            if (!Types.ObjectId.isValid(id)){
                throw Error("Id passed in must be a string of 12 bytes or a string of 24 hex characters or an integer")
            }
            Validators.validateBody()
            // @ts-ignore
        } catch (err: Error){
            console.log(err)
            res.status(428).json({message: err.message})
            return
        }
        this.service.updateProfileNameCity(req).then(list => {
            res.setHeader('Content-Type', 'application/json')

            // @ts-ignore
            list.acknowledged ? res.status(204).json({id: list.insertedId})
                //@ts-ignore
                : res.status(500).json(list.errmsg || 'Unexpected behavior occurred during creation.')

        });
    }

    // @ts-ignore
    @ApiOperationDelete({
        parameters: {
            query: {
                "id": {
                    name:"id",
                    description: "An Id of the Profile User",
                    required: true
                },
            }
        },
        responses: {
            200: {}
        }
    })
    private deleteUser = async (req: express.Request, res : express.Response) => {
        //@ts-ignore
        try {
            //@ts-ignore
            Validator.validateId(req.query.id)
            // @ts-ignore
        } catch (err: Error){
            console.log(err)
            res.status(428).json({message: err.message})
            return
        }
        this.service.deleteProfile(req).then((response) => {
            res.setHeader('Content-Type', 'application/json')


            // @ts-ignore
            response.deletedCount > 0 ? res.status(200).send()
                // @ts-ignore
                : res.status(500).json(response.errmsg || 'Unexpected behavior occurred during deletion operation.')
        });
    }

    public constructor() {
        this.router =  express.Router();
        this.setRoutes();
        this.service = new ProfileService();
    }

    private setRoutes() {
        this.router.get(`${this.path}?:username`, Validator.validateId ,this.getUserByName);
        this.router.post(`${this.path}?:username`, this.saveUserNameCity);
        this.router.put(`${this.path}?:id`,Validator.validateId,  this.updateUserNameCity);
        this.router.delete(`${this.path}?:id`,Validator.validateId , this.deleteUser);
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

export default ProfileController
