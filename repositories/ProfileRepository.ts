import mongoose, {Collection, Connection} from "mongoose"
import Profile from "../models/Profile.js";
import MongoTemplate from "../templates/MongoTemplates.js";

class ProfileRepository {
    private readonly collection : Collection<Profile>;
    private collectionName : string = 'Profiles'
    private readonly mongoTemplate : MongoTemplate;
    constructor() {
        this.mongoTemplate = MongoTemplate.getInstance();
        this.collection = MongoTemplate.getClient(this.mongoTemplate).collection(this.collectionName);
    }
    async getProfileByUserName(name: string) {
        return await this.collection.findOne({"name": name})
    }
//@ts-ignore
    async saveProfileName(profile: Profile) : Promise<InsertOneResult<Profile>>{
        return await this.collection.insertOne(profile);
    }
}

export default ProfileRepository;