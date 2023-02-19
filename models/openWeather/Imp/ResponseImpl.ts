import Coordinates from "../../Coordinates.js";
import {
    MainWeatherMeasurements,
    OpenWeather, OpenWeatherCloud, OpenWeatherRain,
    OpenWeatherResponse, OpenWeatherSysInfo,
    OpenWeatherWind
} from "../Response.js";

export class MainWeatherMeasurementsImpl implements MainWeatherMeasurements {
    private _feelsLike: number;
    private _groundLevel: number;
    private _humidity: number;
    private _pressure: number;
    private _seaLevel: number;
    private _tMax: number;
    private _tMin: number;
    private _temp: number;


    constructor(feelsLike: number, groundLevel: number, humidity: number, pressure: number, seaLevel: number, tMax: number, tMin: number, temp: number) {
        this._feelsLike = feelsLike;
        this._groundLevel = groundLevel;
        this._humidity = humidity;
        this._pressure = pressure;
        this._seaLevel = seaLevel;
        this._tMax = tMax;
        this._tMin = tMin;
        this._temp = temp;
    }


    get feelsLike(): number {
        return this._feelsLike;
    }

    set feelsLike(value: number) {
        this._feelsLike = value;
    }

    get groundLevel(): number {
        return this._groundLevel;
    }

    set groundLevel(value: number) {
        this._groundLevel = value;
    }

    get humidity(): number {
        return this._humidity;
    }

    set humidity(value: number) {
        this._humidity = value;
    }

    get pressure(): number {
        return this._pressure;
    }

    set pressure(value: number) {
        this._pressure = value;
    }

    get seaLevel(): number {
        return this._seaLevel;
    }

    set seaLevel(value: number) {
        this._seaLevel = value;
    }

    get tMax(): number {
        return this._tMax;
    }

    set tMax(value: number) {
        this._tMax = value;
    }

    get tMin(): number {
        return this._tMin;
    }

    set tMin(value: number) {
        this._tMin = value;
    }

    get temp(): number {
        return this._temp;
    }

    set temp(value: number) {
        this._temp = value;
    }
}

export class OpenWeatherResponseImpl implements OpenWeatherResponse {
    private _base: string;
    private _cod: number;
    private _coordinates: Coordinates;
    private _dt: number;

    private _sys: OpenWeatherSysInfo;
    private _id: number;
    private _main: MainWeatherMeasurements;
    private _name: string;
    private _rain: OpenWeatherRain;
    private _timeZone: number;
    private _visibility: number;
    private _weather: OpenWeather[];
    private _wind: OpenWeatherWind;
    private _cloud : OpenWeatherCloud


    constructor(base: string, cod: number, coordinates: Coordinates, dt: number, sys: OpenWeatherSysInfo, id: number, main: MainWeatherMeasurements, name: string, rain: OpenWeatherRain, timeZone: number, visibility: number, weather: OpenWeather[], wind: OpenWeatherWind, cloud: OpenWeatherCloud) {
        this._base = base;
        this._cod = cod;
        this._coordinates = coordinates;
        this._dt = dt;
        this._sys = sys;
        this._id = id;
        this._main = main;
        this._name = name;
        this._rain = rain;
        this._timeZone = timeZone;
        this._visibility = visibility;
        this._weather = weather;
        this._wind = wind;
        this._cloud = cloud;
    }

    get cloud(): OpenWeatherCloud {
        return this._cloud;
    }

    get base(): string {
        return this._base;
    }

    get cod(): number {
        return this._cod;
    }

    get coordinates(): Coordinates {
        return this._coordinates;
    }

    get dt(): number {
        return this._dt;
    }

    get sys(): OpenWeatherSysInfo {
        return this._sys;
    }

    get id(): number {
        return this._id;
    }

    get main(): MainWeatherMeasurements {
        return this._main;
    }

    get name(): string {
        return this._name;
    }

    get rain(): OpenWeatherRain {
        return this._rain;
    }

    get timeZone(): number {
        return this._timeZone;
    }

    get visibility(): number {
        return this._visibility;
    }

    get weather(): OpenWeather[] {
        return this._weather;
    }

    get wind(): OpenWeatherWind {
        return this._wind;
    }
}

export class OpenWeatherImpl implements OpenWeather {
    private _description: string;
    private _icon: string;
    private _id: number;
    private _main: string;

    constructor(description: string, icon: string, id: number, main: string) {
        this._description = description;
        this._icon = icon;
        this._id = id;
        this._main = main;
    }

    get description(): string {
        return this._description;
    }

    get icon(): string {
        return this._icon;
    }

    get id(): number {
        return this._id;
    }

    get main(): string {
        return this._main;
    }
}

export class OpenWeatherRainImpl implements OpenWeatherRain {
    private _Hourly: number;

    constructor(Hourly: number) {
        this._Hourly = Hourly;
    }

    get Hourly(): number {
        return this._Hourly;
    }
}

export class OpenWeatherWindImpl implements OpenWeatherWind {
    private _degree: number;
    private _gust: number;
    private _speed: number;

    constructor(degree: number, gust: number, speed: number) {
        this._degree = degree;
        this._gust = gust;
        this._speed = speed;
    }

    get degree(): number {
        return this._degree;
    }

    get gust(): number {
        return this._gust;
    }

    get speed(): number {
        return this._speed;
    }
}

export class OpenWeatherSysInfoImpl implements OpenWeatherSysInfo {
    private _country: string;
    private _id: number;
    private _sunrise: number;
    private _sunset: number;
    private _type: number;


    constructor(country: string, id: number, sunrise: number, sunset: number, type: number) {
        this._country = country;
        this._id = id;
        this._sunrise = sunrise;
        this._sunset = sunset;
        this._type = type;
    }

    get country(): string {
        return this._country;
    }

    get id(): number {
        return this._id;
    }

    get sunrise(): number {
        return this._sunrise;
    }

    get sunset(): number {
        return this._sunset;
    }

    get type(): number {
        return this._type;
    }
}

export class OpenWeatherCloudImpl implements OpenWeatherCloud {
    private _all: number;

    constructor(all: number) {
        this._all = all;
    }

    get all(): number {
        return this._all;
    }
}