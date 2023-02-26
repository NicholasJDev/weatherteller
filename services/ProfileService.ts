import ProfileRepository from "../repositories/ProfileRepository.js";
import express from "express";
import Profile from "../models/Profile.js";
import {Types} from "mongoose";
import {check} from "express-validator";
import CityService from "./CityService.js";
import CityRepository from "../repositories/CityRepository.js";
import coordinates from "../models/Coordinates.js";
import {CityImpl} from "../models/City.js";

class ProfileService {
    private repository: ProfileRepository;
    private cityService: CityService;

    constructor() {
        this.repository = new ProfileRepository();
        this.cityService = new CityService( new CityRepository());
    }

    async saveProfileNameCity(req: express.Request) {
        let name = req.query.username;
        let cityName = req.query.city_name;
        if (typeof name == "string") {
            if (typeof cityName == "string") {
                let weatherCity = await this.cityService.getWeatherByCityName(cityName)
                    //@ts-ignore
                    .then(cityResult => cityResult)

                let coord = (weatherCity as unknown as CityImpl).location;
                // @ts-ignore
                return this.repository.saveProfile(new Profile(name, coord))
            }
        }
    }
    async updateProfileNameCity(req: express.Request) {
        let id = req.query.id;
        let user = req.body;
        let profile = new Profile(user.name)
        //@ts-ignore
        profile._id = new Types.ObjectId(id);
        return this.repository.updateProfile(profile)
    }

    async getProfileByUserName(req: express.Request) {
        let name = req.query.username;
        let profileByUserName;
        let weather;
        if (typeof name == "string") {
             profileByUserName = this.repository.getProfileByUserName(name);
        }

        // @ts-ignore
        profileByUserName.then(profile => { this.cityService.getWeatherByLocation(profile.location)}).then(city => weather = city.weather)
          return {user: profileByUserName, weather: weather};
    };

    deleteProfile({query: {id}}: express.Request) {
        let validationChain = check('id', 'Id must be initialized').not().isEmpty();
        if (!validationChain.isString()) {
            throw new Error("SOmething isn't right")
        }
        // @ts-ignore
        let userId = id.toString()
        let objectId = new Types.ObjectId(userId);

        return this.repository.deleteProfile(objectId)
    }
}

export default ProfileService;