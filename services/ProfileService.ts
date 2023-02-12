import ProfileRepository from "../repositories/ProfileRepository.js";
import express from "express";
import Profile from "../models/Profile.js";
import {Types} from "mongoose";
import {check} from "express-validator";

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
            return this.repository.saveProfile(new Profile(name))
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
        if (typeof name == "string")
          return this.repository.getProfileByUserName(name);
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