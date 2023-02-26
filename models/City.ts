import Coordinates from "./Coordinates.js";
import {OpenWeather} from "./openWeather/Response.js";
import {Types} from "mongoose";

interface City {
    _id?: Types.ObjectId | undefined
    name: string
    location: Coordinates
    weather: OpenWeather[]
    lastUpdate: Date;
}

export class CityImpl implements City {
    _id?: Types.ObjectId | undefined;
    lastUpdate: Date;
    location: Coordinates;
    name: string;
    weather: OpenWeather[];

    constructor(location: Coordinates, name: string, weather: OpenWeather[], id?: Types.ObjectId) {
        this._id = id;
        this.lastUpdate = new Date();
        this.location = location;
        this.name = name;
        this.weather = weather;
    }

}

export default City