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


    constructor(feelsLike: number, groundLevel: number, humidity: number, pressure: number, tMax: number, tMin: number, temp: number, seaLevel?: number) {
        this._feelsLike = feelsLike;
        this._groundLevel = groundLevel ? groundLevel : 0;
        this._humidity = humidity;
        this._pressure = pressure;
        this._seaLevel = seaLevel ? seaLevel : 0;
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
    private _base: string | undefined;
    private _cod: number | undefined;
    private _coordinates: Coordinates | undefined;
    private _dt: number | undefined;

    private _sys: OpenWeatherSysInfo | undefined;
    private _id: number | undefined;
    private _main: MainWeatherMeasurements | undefined;
    private _name: string | undefined;
    private _rain: OpenWeatherRain | undefined;
    private _timeZone: number | undefined;
    private _visibility: number | undefined;
    private _weather: OpenWeather[] | undefined;
    private _wind: OpenWeatherWind | undefined;
    private _cloud: OpenWeatherCloud | undefined


    private constructor(base: string | undefined, cod: number | undefined, coordinates: Coordinates | undefined, dt: number | undefined, sys: OpenWeatherSysInfo | undefined, id: number | undefined, main: MainWeatherMeasurements | undefined, name: string | undefined, rain: OpenWeatherRain | undefined, timeZone: number | undefined, visibility: number | undefined, weather: OpenWeather[] | undefined, wind: OpenWeatherWind | undefined, cloud: OpenWeatherCloud | undefined) {
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

    public static OpenWeatherResponseImplBuilder = class {

        private base: string | undefined;
        private cod: number | undefined;
        private coordinates: Coordinates | undefined;
        private dt: number | undefined;

        private sys: OpenWeatherSysInfo | undefined;
        private id: number | undefined;
        private main: MainWeatherMeasurements | undefined;
        private name: string | undefined;
        private rain: OpenWeatherRain | undefined;
        private timeZone: number | undefined;
        private visibility: number | undefined;
        private weather: OpenWeather[] | undefined;
        private wind: OpenWeatherWind | undefined;
        private cloud: OpenWeatherCloud | undefined

        constructor() {
        }

        withBase(base: string) {
            this.base = base;
            return this;
        }

        withCod(cod: number) {
            this.cod = cod;
            return this;
        }

        withCoordinates(coord: Coordinates) {
            this.coordinates = coord;
            return this;
        }

        withDt(dt: number) {
            this.dt = dt;
            return this;
        }

        withSys(sys: OpenWeatherSysInfo) {
            this.sys = sys;
            return this;
        }

        withId(id: number) {
            this.id = id;
            return this;
        }

        withMain(main: MainWeatherMeasurements) {
            this.main = main;
            return this;
        }

        withName(name: string) {
            this.name = name;
            return this;
        }

        withRain(rain: OpenWeatherRain) {
            this.rain = rain;
            return this;
        }

        withTimeZone(timeZone: number) {
            this.timeZone = timeZone;
            return this;
        }

        withVisibility(visibility: number) {
            this.visibility = visibility;
            return this;
        }

        withWeather(weather: OpenWeather[]) {
            this.weather = weather;
            return this;
        }
        withWind(wind: OpenWeatherWind) {
            this.wind = wind;
            return this;
        }

        withCloud(cloud: OpenWeatherCloud) {
            this.cloud = cloud;
            return this;
        }

        build(){
            return new OpenWeatherResponseImpl(this.base, this.cod,
                this.coordinates, this.dt, this.sys, this.id,
                this.main, this.name,this.rain, this.timeZone, this.visibility,
                this.weather, this.wind, this.cloud)
        }
    }

    get cloud(): OpenWeatherCloud | undefined {
        return this._cloud;
    }

    get base(): string | undefined {
        return this._base;
    }

    get cod(): number | undefined {
        return this._cod;
    }

    get coordinates(): Coordinates | undefined {
        return this._coordinates;
    }

    get dt(): number | undefined {
        return this._dt;
    }

    get sys(): OpenWeatherSysInfo | undefined {
        return this._sys;
    }

    get id(): number | undefined {
        return this._id;
    }

    get main(): MainWeatherMeasurements | undefined {
        return this._main;
    }

    get name(): string | undefined {
        return this._name;
    }

    get rain(): OpenWeatherRain | undefined {
        return this._rain;
    }

    get timeZone(): number | undefined {
        return this._timeZone;
    }

    get visibility(): number | undefined {
        return this._visibility;
    }

    get weather(): OpenWeather[] | undefined {
        return this._weather;
    }

    get wind(): OpenWeatherWind | undefined {
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
    private _hourly?: number | undefined;

    constructor(hourly: number) {
        this._hourly = hourly ? hourly : 0;
    }

    get hourly(): number | undefined {
        return this._hourly;
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

