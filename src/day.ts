import { DaySetup } from "./setup";


// Information we return after a day finishes
export interface DayResult {
    glassesMade: number;
    glassesSold: number;

    lemonadeCost: number;
    signsCost: number;
    totalExpenses: number;

    revenue: number;
    profit: number;

    assets: number;
}


// Run one day of the lemonade stand
export function runDay(
    day: number,
    assets: number,
    setup: DaySetup,
    glassesSold: number
): DayResult {

    // -------------------------
    // Cost per glass
    // -------------------------

    let glassCost: number;

    if (day >= 3) {
        glassCost = 0.04;
    }
    else {
        glassCost = 0.02;
    }


    // -------------------------
    // Expenses
    // -------------------------

    const lemonadeCost =
        setup.glasses * glassCost;

    const signsCost =
        setup.signs * 0.15;

    const totalExpenses =
        lemonadeCost + signsCost;


    // -------------------------
    // Revenue
    // -------------------------

    const priceInDollars =
        setup.priceInCents / 100;

    const revenue =
        glassesSold * priceInDollars;


    // -------------------------
    // Profit
    // -------------------------

    const profit =
        revenue - totalExpenses;


    // -------------------------
    // Update assets
    // -------------------------

    const newAssets =
        assets + profit;


    // -------------------------
    // Display results
    // -------------------------

    console.log();
    console.log("DAY " + day + " RESULTS");
    console.log("----------------------");

    console.log("Glasses Made: " + setup.glasses);
    console.log("Glasses Sold: " + glassesSold);

    console.log();

    console.log(
        "Cost Per Glass: $" +
        glassCost.toFixed(2)
    );

    console.log(
        "Lemonade Cost: $" +
        lemonadeCost.toFixed(2)
    );

    console.log(
        "Signs Cost: $" +
        signsCost.toFixed(2)
    );

    console.log(
        "Total Expenses: $" +
        totalExpenses.toFixed(2)
    );

    console.log();

    console.log(
        "Revenue: $" +
        revenue.toFixed(2)
    );

    console.log(
        "Profit: $" +
        profit.toFixed(2)
    );

    console.log(
        "Assets: $" +
        newAssets.toFixed(2)
    );


    // Send the results back to main.ts
    return {
        glassesMade: setup.glasses,
        glassesSold: glassesSold,

        lemonadeCost: lemonadeCost,
        signsCost: signsCost,
        totalExpenses: totalExpenses,

        revenue: revenue,
        profit: profit,

        assets: newAssets
    };
}