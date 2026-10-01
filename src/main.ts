import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

let glasses: number;
let signs: number;
let priceInCents: number;


// Ask for a whole number
function askNumber(question: string, callback: (value: number) => void) {

    rl.question(question, (answer) => {

        const value = Number(answer);

        // Check for empty input, decimals, negative numbers, or text
        if (
            answer.trim() === "" ||
            !Number.isInteger(value) ||
            value < 0
        ) {
            console.log("Please enter a whole number.");

            // Ask the same question again
            askNumber(question, callback);

            return;
        }

        callback(value);
    });
}


// Ask all three setup questions
function askQuestions() {

    askNumber(
        "How many glasses of lemonade will you make? ",
        (answer) => {

            glasses = answer;

            askNumber(
                "How many signs would you like to make? ",
                (answer) => {

                    signs = answer;

                    askNumber(
                        "How much would you like to charge per lemonade in cents? ",
                        (answer) => {

                            priceInCents = answer;

                            confirmChoices();
                        }
                    );
                }
            );
        }
    );
}


// Show answers and ask for confirmation
function confirmChoices() {

    console.log();
    console.log("LEMONADE STAND SETUP");
    console.log("--------------------");

    console.log("Glasses: " + glasses);
    console.log("Signs: " + signs);
    console.log(
        "Price: $" + (priceInCents / 100).toFixed(2)
    );

    console.log();

    rl.question(
        "Are you happy with these choices? (Y/N): ",
        (answer) => {

            answer = answer.trim().toUpperCase();

            // Y or just ENTER
            if (answer === "Y" || answer === "") {

                startGame();
            }

            // N = redo questions
            else if (answer === "N") {

                console.log();
                console.log("Let's try again.");
                console.log();

                askQuestions();
            }

            else {

                console.log("Please enter Y or N.");

                confirmChoices();
            }
        }
    );
}


// Next part of program
function startGame() {

    console.log();
    console.log("Your lemonade stand is ready!");
    console.log();

    console.log("Glasses: " + glasses);
    console.log("Signs: " + signs);
    console.log(
        "Price per lemonade: $" +
        (priceInCents / 100).toFixed(2)
    );

    rl.close();
}


// Start program
askQuestions();