import Coordinates from "./Coordinates.js";

interface City {
    id: string
    name: string
    location: Coordinates
    weather?: string
}

export default City