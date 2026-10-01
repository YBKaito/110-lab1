import {
    getDaySetup,
    DaySetup
} from "./setup";

import {
    runDay,
    DayResult
} from "./day";

import {
    generateWeather,
    WeatherResult
} from "./weather";

import {
    calculateGlassesSold
} from "./sales";


// These variables survive between days
let day: number = 1;
let assets: number = 2.00;


// Run one day
function startDay() {

    // Generate weather for the day
    const weather: WeatherResult = generateWeather();


    console.log();
    console.log("======================");
    console.log("DAY " + day);
    console.log("======================");

    console.log("Assets: $" + assets.toFixed(2));

    console.log("Weather: " + weather.weather);


    // Only show rain chance if it is cloudy
    if (weather.weather === "Cloudy") {

        console.log(
            "Chance of Rain: " +
            weather.rainChance +
            "%"
        );
    }


    // Starting Day 3, lemonade costs more to make
    if (day === 3) {

        console.log();

        console.log(
            "NOTICE: The cost to make lemonade has increased to $0.04 per glass!"
        );
    }


    console.log();


    // Ask player how many glasses, signs, and price
    getDaySetup((setup: DaySetup) => {


        // Calculate how many glasses were sold
        const glassesSold: number =
            calculateGlassesSold(
                setup,
                weather
            );


        // Run all calculations for the day
        const result: DayResult = runDay(
            day,
            assets,
            setup,
            glassesSold
        );


        // Carry assets into the next day
        assets = result.assets;


        // Move to next day
        day++;


        // Start next day
        startDay();
    });
}


// Start the game at Day 1
startDay();