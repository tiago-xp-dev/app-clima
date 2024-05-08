import { useToast } from "react-native-toast-notifications";
import { OpenWeatherAPI } from "../services/openweatherApi";

export default function useOpenWeatherAPI() {
    const toast = useToast();

    async function getCurrentWeather(lat, lon) {
        return await OpenWeatherAPI.getCurrentWeather(lat, lon);
    }

    async function get5DayForescast(lat,lon){
        return await OpenWeatherAPI.get5DayForescast(lat, lon);
    }

    return { getCurrentWeather, get5DayForescast }
}