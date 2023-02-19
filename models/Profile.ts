import Coordinates, {CoordinateModel} from "./Coordinates.js";
import { Types} from "mongoose";
import {ApiModel, ApiModelProperty} from "swagger-express-ts";

@ApiModel({name: 'Profile',
description: 'User that is going to use this application'})
class Profile {

    _id?: Types.ObjectId | undefined;
    name: string;

    _location: Coordinates | undefined;

    private _coordinates: Coordinates | undefined;

    constructor( name: string) {
        this.name = name;
    }

    get id(): Types.ObjectId | undefined {
        return this._id;
    }

    set id(value: Types.ObjectId | undefined) {
        this._id = value;
    }
    get location(): Coordinates {
        return <Coordinates>this._location;
    }

    set location(value: Coordinates) {
        this._location = value;
    }

    removeIdField(){
        delete this._id
    }
}

export default Profile;
