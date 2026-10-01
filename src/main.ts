import {
    getDaySetup,
    DaySetup
} from "./setup";

import {
    runDay,
    DayResult
} from "./day";


// These survive between days
let day: number = 1;
let assets: number = 2.00;


// Run one day
function startDay() {

    console.log();
    console.log("======================");
    console.log("DAY " + day);
    console.log("======================");

    console.log("Assets: $" + assets.toFixed(2));

    if (day === 3) {
        console.log();
        console.log(
            "NOTICE: The cost to make lemonade has increased to $0.04 per glass!"
        );
    }

    console.log();

    getDaySetup((setup: DaySetup) => {

        const glassesSold: number = 10;

        const result: DayResult = runDay(
            day,
            assets,
            setup,
            glassesSold
        );

        assets = result.assets;

        day++;

        startDay();
    });
}

// Start Day 1
startDay();