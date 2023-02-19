import CityRepository from "../repositories/CityRepository.js";
import OpenWeatherService from "./OpenWeatherService.js";
import {CityImpl} from "../models/City.js";
import Coordinates from "../models/Coordinates.js";

class CityService {

    private repository : CityRepository;
    private weatherService : OpenWeatherService;


    constructor(repository: CityRepository) {
        this.repository = repository;
        this.weatherService = new OpenWeatherService();
    }

    getWeatherByCityName(cityName:string) {
       return  this.repository.getCity(cityName).then( city => {
         if (city) {
             return city;
         }
         let weatherByCityName = this.weatherService.getCurrentWeatherByCityName(cityName);
         return this.repository.saveCity(new CityImpl(weatherByCityName.coordinates, weatherByCityName.name, weatherByCityName.weather))
        })
    }

    getWeatherByLocation(location: Coordinates) {
        return this.repository.getCityByLocation(location)
    }
}

export default CityService;