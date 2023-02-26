import {Model, Schema, Types} from "mongoose"
import MongoTemplate from "../templates/MongoTemplates.js";
import Coordinates from "../models/Coordinates.js";;
import City, {CityImpl} from "../models/City.js";
import {OpenWeatherImpl} from "../models/openWeather/Imp/ResponseImpl.js";

class CityRepository {
    private readonly city: Model<CityImpl>;
    private collectionName : string = 'Cities'
    private readonly mongoTemplate : MongoTemplate;

    constructor() {
        this.mongoTemplate = MongoTemplate.getInstance();
        this.city = MongoTemplate.getClient(this.mongoTemplate).model<City>('Cities', citySchema, this.collectionName);
    }
    async getCity(name: string) {
        return await this.city.findOne({"name": name})
    }

    async getCityById(id: Types.ObjectId) {
        return await this.city.findOne({"_id": id});
    }

    //@ts-ignore
    async saveCity(city: City) : Promise<InsertOneResult<City>> {
        return await this.city.collection.insertOne(city);
    }
    async updateCity(city: CityImpl) {
        return await this.city.replaceOne({"_id" : city._id}, city);
    }

    async getCityByLocation(location: Coordinates) {
        return await this.city.findOne({"location": location});
    }
}

export default CityRepository;

export const citySchema =  new Schema({
    name: String,

    location: {},

    lastUpdate : Date

})