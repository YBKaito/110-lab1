import { createInterface } from "readline";


// This describes the information that setup.ts will return
export interface DaySetup {
    glasses: number;
    signs: number;
    priceInCents: number;
}


// Create terminal input
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});


// Ask the user for a whole number
function askNumber(
    question: string,
    callback: (value: number) => void
) {

    rl.question(question, (answer) => {

        const value = Number(answer);

        // Make sure the answer is a non-negative integer
        if (
            answer.trim() === "" ||
            !Number.isInteger(value) ||
            value < 0
        ) {
            console.log("Please enter a whole number.");
            askNumber(question, callback);
            return;
        }

        callback(value);
    });
}


// Main setup function
export function getDaySetup(
    callback: (setup: DaySetup) => void
) {

    askNumber(
        "How many glasses of lemonade will you make? ",
        (glasses) => {

            askNumber(
                "How many signs would you like to make? ($0.15 charge per sign) ",
                (signs) => {

                    askNumber(
                        "How much would you like to charge per lemonade in cents? ",
                        (priceInCents) => {

                            const setup: DaySetup = {
                                glasses: glasses,
                                signs: signs,
                                priceInCents: priceInCents
                            };

                            confirmSetup(setup, callback);
                        }
                    );
                }
            );
        }
    );
}


// Ask if the player is happy with their choices
function confirmSetup(
    setup: DaySetup,
    callback: (setup: DaySetup) => void
) {

    console.log();
    console.log("LEMONADE STAND SETUP");
    console.log("--------------------");
    console.log("Glasses: " + setup.glasses);
    console.log("Signs: " + setup.signs);
    console.log(
        "Price: $" + (setup.priceInCents / 100).toFixed(2)
    );
    console.log();

    rl.question(
        "Are you happy with these choices? (Y/N): ",
        (answer) => {

            answer = answer.trim().toUpperCase();

            // Y or just ENTER = accept
            if (answer === "Y" || answer === "") {

                callback(setup);
            }

            // N = redo setup
            else if (answer === "N") {

                console.log();
                console.log("Let's try again.");
                console.log();

                getDaySetup(callback);
            }

            else {

                console.log("Please enter Y or N.");

                confirmSetup(setup, callback);
            }
        }
    );
}


// Close terminal input when the game is finished
export function closeSetup() {
    rl.close();
}