import {Model, Schema, Types} from "mongoose"
import MongoTemplate from "../templates/MongoTemplates.js";
import {CoordinateModel} from "../models/Coordinates.js";
import Profile from "../models/Profile.js";

class ProfileRepository {
    private readonly profile: Model<Profile>;
    private collectionName : string = 'Profiles'
    private readonly mongoTemplate : MongoTemplate;

    constructor() {
        this.mongoTemplate = MongoTemplate.getInstance();
        this.profile = MongoTemplate.getClient(this.mongoTemplate).model<Profile>('Profile', profileSchema, this.collectionName);
    }
    async getProfileByUserName(name: string) {
        return await this.profile.findOne({"name": name})
    }
//@ts-ignore
    async saveProfile(profile: Profile) : Promise<InsertOneResult<Profile>>{
        return await this.profile.collection.insertOne(profile);
    }
    async updateProfile(profile: Profile) {
        return await this.profile.replaceOne({"_id" : profile.id}, profile);
    }

    async deleteProfile(id: Types.ObjectId) {
        return await this.profile.deleteOne({"_id" : id});
    }
}

export default ProfileRepository;

export const profileSchema =  new Schema({
    name: String,
    coordinates: CoordinateModel
})