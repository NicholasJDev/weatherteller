import {config} from "dotenv";
import mongoose, {Connection} from "mongoose";


class MongoTemplate {
    static instance: MongoTemplate;
    private database: Connection | undefined;

    constructor() {
        config();
        this.initializeDb();
    }

    initializeDb() {
        if (this.database) {
            console.log("Db is already set and ready to work");
            return MongoTemplate.getClient(this);
        }
        let url = process.env.MONGO_DB ? process.env.MONGO_DB : "";
        mongoose.connect(url, {});
        mongoose.set("strictQuery", true);
        this.database = mongoose.connection;
    }

    static getClient(template: MongoTemplate) {
        if (template.database)
            return template.database;
        throw Error("Database isn't ready.");
    };

    static getInstance(): MongoTemplate {
        if (MongoTemplate.instance) {
            return MongoTemplate.instance
        }
        MongoTemplate.instance = new MongoTemplate()
        return MongoTemplate.instance
    }
}

export default MongoTemplate;