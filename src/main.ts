import {
    getDaySetup,
    closeSetup,
    DaySetup
} from "./setup";

import {
    runDay,
    DayResult
} from "./day";


// Variables that survive between days
let day: number = 1;
let assets: number = 2.00;


console.log("DAY " + day);
console.log("Assets: $" + assets.toFixed(2));
console.log();


getDaySetup((setup: DaySetup) => {

    // TEMPORARY
    // Pretend we sold 10 glasses
    const glassesSold = 10;


    const result: DayResult = runDay(
        day,
        assets,
        setup,
        glassesSold
    );


    // Update our assets
    assets = result.assets;


    // Move to next day
    day++;


    closeSetup();
});