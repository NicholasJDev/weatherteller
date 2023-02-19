import Coordinates from "./Coordinates.js";
import {OpenWeather} from "./openWeather/Response.js";

interface City {
    id?: string
    name: string
    location: Coordinates
    weather: OpenWeather[]
    lastUpdate: Date;
}

export class CityImpl implements City {
    private _id?: string;

    private _lastUpdate: Date;
    private _location: Coordinates;
    private _name: string;
    private _weather: OpenWeather[];

    constructor(location: Coordinates, name: string, weather: OpenWeather[], id?: string ) {
        this._id = id;
        this._lastUpdate = new Date();
        this._location = location;
        this._name = name;
        this._weather = weather;
    }

    get id(): string | undefined {
        return this._id;
    }

    get lastUpdate(): Date {
        return this._lastUpdate;
    }

    get location(): Coordinates {
        return this._location;
    }

    get name(): string {
        return this._name;
    }

    get weather(): OpenWeather[] {
        return this._weather;
    }
}

export default City