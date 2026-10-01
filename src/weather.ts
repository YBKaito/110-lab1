export type Weather =
    "Hot and Dry" |
    "Sunny" |
    "Cloudy";


export interface WeatherResult {
    weather: Weather;
    rainChance: number;
}


export function generateWeather(): WeatherResult {

    const random =
        Math.floor(Math.random() * 3);


    if (random === 0) {

        return {
            weather: "Hot and Dry",
            rainChance: 0
        };
    }

    else if (random === 1) {

        return {
            weather: "Sunny",
            rainChance: 0
        };
    }

    else {

        return {
            weather: "Cloudy",
            rainChance:
                Math.floor(Math.random() * 101)
        };
    }
}