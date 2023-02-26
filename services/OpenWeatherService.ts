import {
    MainWeatherMeasurementsImpl, OpenWeatherCloudImpl, OpenWeatherImpl, OpenWeatherRainImpl,
    OpenWeatherResponseImpl,
    OpenWeatherSysInfoImpl, OpenWeatherWindImpl
} from "../models/openWeather/Imp/ResponseImpl.js";
import {OpenWeather, OpenWeatherResponse} from "../models/openWeather/Response.js";
import Coordinates from "../models/Coordinates.js";

import get from "axios";
import {response} from "express";


class OpenWeatherService {
    private readonly baseUrl: string
    private readonly apiKey: string

    constructor(url?: string) {
        this.baseUrl = url ? url : "https://api.openweathermap.org"
        // @ts-ignore
        this.apiKey = process.env.WEATHER_API_KEY

    }

    public async getCurrentWeatherByCityName(cityname: string): Promise<OpenWeatherResponse> {

        let query = `${this.baseUrl}/data/2.5/weather?q=${cityname}&appid=${this.apiKey}`


        let req = await get(query)
        let response = req.data
        console.log(response.toString())
        let builder = new OpenWeatherResponseImpl.OpenWeatherResponseImplBuilder()
        builder.withBase(response.base)
            .withCod(response.cod)
            .withDt(response.dt)
            .withId(response.id)
            .withName(response.name)
            .withTimeZone(response.timezone)
            .withVisibility(response.visibility)

        if (response.coord) {
            builder.withCoordinates(new Coordinates(response.coord.lon, response.coord.lat))
        }

        if (response.sys) {
            builder.withSys(new OpenWeatherSysInfoImpl(response.sys.country,
                response.sys.id,
                response.sys.sunrise,
                response.sys.sunset,
                response.sys.type))
        }

        if (response.main) {
            builder.withMain(new MainWeatherMeasurementsImpl(response.main.feels_like,
                response.main.grnd_level,
                response.main.humidity,
                response.main.pressure,
                response.main.sea_level,
                response.main.temp_max,
                response.main.temp_min,
                response.main.temp))
        }

        if (response.rain) {
            builder.withRain(new OpenWeatherRainImpl(response.rain))
        }

        if (response.weather.length) {

            let weathers: OpenWeather[] = [];
            response.weather.forEach(
                (w: { description: string; icon: string; id: number; main: string; }) =>
                    weathers.push(new OpenWeatherImpl(w.description, w.icon, w.id, w.main)));

            builder.withWeather(weathers)
        }

        if (response.wind) {
            builder.withWind(new OpenWeatherWindImpl(response.wind.deg, response.wind.gust, response.wind.speed))
        }

        if (response.clouds) {
            builder.withCloud(new OpenWeatherCloudImpl(response.clouds.all))
        }

        return builder.build()
    }
}

export default OpenWeatherService;