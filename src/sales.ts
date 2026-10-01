import { DaySetup } from "./setup";
import { WeatherResult } from "./weather";


// Calculate how many glasses of lemonade are sold
export function calculateGlassesSold(
    setup: DaySetup,
    weather: WeatherResult
): number {

    let demandPercentage: number;


    // -------------------------
    // Weather effect
    // -------------------------

    if (weather.weather === "Hot and Dry") {

        demandPercentage = randomBetween(90, 100);
    }

    else if (weather.weather === "Sunny") {

        demandPercentage = randomBetween(60, 90);
    }

    else {

        // Cloudy starts at 60%
        // Rain chance lowers demand
        demandPercentage = 60 - weather.rainChance;
    }


    // -------------------------
    // Sign effect
    // -------------------------

    // Every sign increases demand by 5%
    demandPercentage += setup.signs * 5;


    // -------------------------
    // Price effect
    // -------------------------

    // Prices above 10 cents lower demand.
    // Every cent above 10 lowers demand by 2%.
    if (setup.priceInCents > 10) {

        const extraCents =
            setup.priceInCents - 10;

        demandPercentage -=
            extraCents * 2;
    }


    // -------------------------
    // Keep percentage valid
    // -------------------------

    if (demandPercentage < 0) {
        demandPercentage = 0;
    }

    if (demandPercentage > 100) {
        demandPercentage = 100;
    }


    // -------------------------
    // Calculate glasses sold
    // -------------------------

    const glassesSold = Math.floor(
        setup.glasses *
        (demandPercentage / 100)
    );


    return glassesSold;
}


// Generate random whole number
function randomBetween(
    min: number,
    max: number
): number {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}