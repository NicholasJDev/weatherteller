import Coordinates from "../Coordinates.js";

export interface OpenWeather {
    id: number
    main: string
    description: string
    icon: string
}

export interface MainWeatherMeasurements {
    temp: number
    feelsLike: number
    tMin: number
    tMax: number
    pressure: number
    humidity: number
    seaLevel: number
    groundLevel: number
}

export interface OpenWeatherWind {
    speed: number
    degree: number
    gust: number
}

export interface OpenWeatherRain {
    hourly?: number
}

export interface OpenWeatherSysInfo {
    id: number
    type: number
    country: string
    sunrise: number
    sunset: number
}

export interface OpenWeatherCloud {
    all: number
}

export interface OpenWeatherResponse {
    id: number | undefined
    name: string | undefined
    coordinates: Coordinates | undefined
    weather: OpenWeather[] | undefined
    base: string | undefined
    main: MainWeatherMeasurements | undefined
    visibility: number | undefined
    wind: OpenWeatherWind | undefined
    rain: OpenWeatherRain | undefined
    dt: number | undefined
    sys : OpenWeatherSysInfo | undefined
    timeZone: number | undefined
    cod: number | undefined
    cloud : OpenWeatherCloud | undefined
}