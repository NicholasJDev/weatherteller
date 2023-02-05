import City from "./City.js";

class Profile {
    private id?: string;

    private name: string;
    city?: City;

    constructor(name: string, city?: City) {
        this.city = city;
        this.name = name;
    }
}

export default Profile;