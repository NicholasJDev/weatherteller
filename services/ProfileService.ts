import ProfileRepository from "../repositories/ProfileRepository.js";
import express from "express";
import Profile from "../models/Profile.js";


class ProfileService {
    private repository: ProfileRepository;

    constructor() {
        this.repository = new ProfileRepository();
    }

    async saveProfileNameCity(req: express.Request) {
        let name = req.query.username;
        let cityName = req.query.city_name;
        if (typeof name == "string"
            // && typeof cityName == "string"
        ) {
            return this.repository.saveProfileName(new Profile(name))
        }
    }

    async getProfileByUserName(req: express.Request) {
        let name = req.query.username;
        if (typeof name == "string")
          return this.repository.getProfileByUserName(name);
    };
}

export default ProfileService;