import mongoose from "mongoose";
import {ApiModel, ApiModelProperty} from "swagger-express-ts";
@ApiModel({
    name: 'Coordinate',
    description: "Is a object that represent the location on the map."
})
class Coordinates {

     long : number
     lat : number


    constructor(long: number, lat: number) {
        this.long = long;
        this.lat = lat;
    }


    get getLong(): number {
        return this.long;
    }

    get getlat(): number {
        return this.lat;
    }
}

export default Coordinates;

export const CoordinateModel = new mongoose.Schema({
    log: Number,
    lat: Number
})