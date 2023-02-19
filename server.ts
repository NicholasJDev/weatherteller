import ProfileController from "./controllers/profile.js";
import WeatherApplication from "./app.js";

const app : WeatherApplication = new WeatherApplication(
    [new ProfileController()],
    parseInt(process.env.PORT ? process.env.PORT : "8080")
);
app.listen()