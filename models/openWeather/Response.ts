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
    Hourly: number
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
    id: number
    name: string
    coordinates: Coordinates
    weather: OpenWeather[]
    base: string
    main: MainWeatherMeasurements
    visibility: number
    wind: OpenWeatherWind
    rain: OpenWeatherRain
    dt: number
    sys : OpenWeatherSysInfo
    timeZone: number
    cod: number

    cloud : OpenWeatherCloud
}