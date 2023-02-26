import CityRepository from "../repositories/CityRepository.js";
import OpenWeatherService from "./OpenWeatherService.js";
import {CityImpl} from "../models/City.js";
import Coordinates from "../models/Coordinates.js";
import {response} from "express";
import {ObjectId, Types} from "mongoose";

class CityService {

    private repository : CityRepository;
    private weatherService : OpenWeatherService;


    constructor(repository: CityRepository) {
        this.repository = repository;
        this.weatherService = new OpenWeatherService();
    }

    getWeatherByCityName(cityName:string) {
       return  this.repository.getCity(cityName).then( async city => {
           if (city) {
               return city;
           }
           let id = await this.weatherService.getCurrentWeatherByCityName(cityName)
               .then(async response => await this.repository.saveCity(
                   //@ts-ignore
                   new CityImpl(response.coordinates, response.name, response.weather, new Types.ObjectId))

                   .then( res =>  res.insertedId.id
                   ));
           //@ts-ignore

           return await this.repository.getCityById(new Types.ObjectId(id)).then(city => city.toObject())
       })
    }

    getWeatherByLocation(location: Coordinates) {
        return this.repository.getCityByLocation(location)
    }
}

export default CityService;