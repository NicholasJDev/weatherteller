import * as https from "https";
import {
    MainWeatherMeasurementsImpl, OpenWeatherCloudImpl, OpenWeatherImpl, OpenWeatherRainImpl,
    OpenWeatherResponseImpl,
    OpenWeatherSysInfoImpl, OpenWeatherWindImpl
} from "../models/openWeather/Imp/ResponseImpl.js";
import {OpenWeatherResponse} from "../models/openWeather/Response.js";
import Coordinates from "../models/Coordinates.js";


class OpenWeatherService {
    private readonly baseUrl: string
    private readonly apiKey: string

    constructor(url?: string) {
        this.baseUrl = url ? url : "https://api.openweathermap.org"
        // @ts-ignore
        this.apiKey = process.env.WEATHER_API_KEY

    }

    public getCurrentWeatherByCityName(cityname: string): OpenWeatherResponse {
        let response;
        let responseStr = ""
        https.request(`${this.baseUrl}/data/2.5/weather?q=${cityname}&appid=${this.apiKey}`,
            (resp) => {
                resp.on('data', (chunk) => {
                    responseStr += chunk;
                })
            });

        response = JSON.parse(responseStr)

        return new OpenWeatherResponseImpl(response.base,
            response.cod,
            new Coordinates(response.coord.lon, response.coord.lat),
            response.dt, new OpenWeatherSysInfoImpl(response.sys.country,
                response.sys.id,
                response.sys.sunrise,
                response.sys.sunset,
                response.sys.type),
            response.id,
            new MainWeatherMeasurementsImpl(response.main.feels_like,
                response.main.grnd_level,
                response.main.humidity,
                response.main.pressure,
                response.main.sea_level,
                response.main.temp_max,
                response.main.temp_min,
                response.main.temp),
            response.name,
            new OpenWeatherRainImpl(response.rain.hourly),
            response.time_zone,
            response.visibility,
            [new OpenWeatherImpl(response.weather.description,
                response.weather.icon,
                response.weather.id,
                response.weather.main)],
            new OpenWeatherWindImpl(response.wind.degree, response.wind.gust, response.wind.speed),
            new OpenWeatherCloudImpl(response.clouds.all))
    }
}

export default OpenWeatherService;