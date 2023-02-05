import Coordinates from "../Coordinates.js";

interface OpenWeather {
    id: number
    main: string
    description: string
    icon: string
}

interface MainWeatherMeasurements {
    temp: number
    feelsLike: number
    tMin: number
    tMax: number
    pressure: number
    humidity: number
    seaLevel: number
    groundLevel: number
}

interface OpenWeatherWind {
    speed: number
    degree: number
    gust: number
}

interface OpenWeatherRain {
    Hourly: number
}

interface OpenWeatherSysInfo {
    id: number
    type: number
    country: string
    sunrise: number
    sunset: number
}

interface OpenWeatherCloud {
    all: number
}

interface OpenWeatherResponse {
    id : number
    name : string
    coordinates: Coordinates
    weather: OpenWeather[]
    base: string
    main: MainWeatherMeasurements
    visibility: number
    wind: OpenWeatherWind
    rain: OpenWeatherRain
    dt : number
    timeZone : number
    cod : number
}

export default OpenWeatherResponse;