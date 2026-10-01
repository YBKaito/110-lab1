// Store the user's answers
let glasses: number = 0;
let signs: number = 0;
let priceInCents: number = 0;

// Which question the user is currently answering
let currentQuestion: number = 0;

// What the user is currently typing
let currentInput: string = "";

// Are we asking for confirmation?
let confirming: boolean = false;

// Error message
let errorMessage: string = "";

const app = document.getElementById("app");

if (app) {

    // -------------------------
    // Style page
    // -------------------------

    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.backgroundColor = "#eeeeee";
    document.body.style.fontFamily = "Arial";

    // -------------------------
    // Style box
    // -------------------------

    app.style.width = "650px";
    app.style.minHeight = "350px";
    app.style.padding = "40px";
    app.style.backgroundColor = "black";
    app.style.border = "5px solid white";
    app.style.borderRadius = "15px";
    app.style.color = "white";


    // -------------------------
    // Display screen
    // -------------------------

    function showScreen() {


        if (confirming) {

            app!.innerHTML = `
                <h1>LEMONADE STAND SETUP</h1>

                <p>
                    How many glasses will you make?
                    ${glasses}
                </p>

                <p>
                    How many signs would you like to make?
                    ${signs}
                </p>

                <p>
                    How much will you charge per lemonade?
                    ${priceInCents} cents
                    ($${(priceInCents / 100).toFixed(2)})
                </p>

                <br>

                <p>
                    Are you happy with these choices? (Y/N)
                    ${currentInput}_
                </p>

                <p>
                    Press ENTER to confirm
                </p>

                <p style="color: red;">
                    ${errorMessage}
                </p>
            `;

            return;
        }

        let glassesDisplay = "";
        let signsDisplay = "";
        let priceDisplay = "";


        // Glasses
        if (currentQuestion === 0) {
            glassesDisplay = currentInput + "_";
        }
        else {
            glassesDisplay = glasses.toString();
        }


        // Signs
        if (currentQuestion === 1) {
            signsDisplay = currentInput + "_";
        }
        else if (currentQuestion > 1) {
            signsDisplay = signs.toString();
        }


        // Price
        if (currentQuestion === 2) {
            priceDisplay = currentInput + "_";
        }


        app!.innerHTML = `
            <h1>LEMONADE STAND SETUP</h1>

            <p>
                How many glasses will you make?
                ${glassesDisplay}
            </p>

            <p>
                How many signs would you like to make?
                ${signsDisplay}
            </p>

            <p>
                How much will you charge per lemonade (cents)?
                ${priceDisplay}
            </p>

            <p style="color: red;">
                ${errorMessage}
            </p>
        `;
    }


    // -------------------------
    // Next page
    // -------------------------

    function nextPage() {

        app!.innerHTML = `
            <h1>Your Lemonade Stand</h1>

            <p>Glasses: ${glasses}</p>

            <p>Signs: ${signs}</p>

            <p>
                Price per lemonade:
                $${(priceInCents / 100).toFixed(2)}
            </p>

            <h2>Ready to begin!</h2>
        `;
    }


    // Show first screen
    showScreen();


    // -------------------------
    // Keyboard controls
    // -------------------------

    document.addEventListener("keydown", (event) => {


        // =========================================
        // CONFIRMATION MODE
        // =========================================

        if (confirming) {

            // User types Y
            if (event.key.toLowerCase() === "y") {

                currentInput = "Y";
                errorMessage = "";

                showScreen();
            }


            // User types N
            else if (event.key.toLowerCase() === "n") {

                currentInput = "N";
                errorMessage = "";

                showScreen();
            }


            // Backspace removes Y/N
            else if (event.key === "Backspace") {

                currentInput = "";
                errorMessage = "";

                showScreen();
            }


            // ENTER confirms their choice
            else if (event.key === "Enter") {


                // N = redo questions
                if (currentInput === "N") {

                    currentQuestion = 0;
                    currentInput = "";
                    confirming = false;
                    errorMessage = "";

                    showScreen();
                }


                // Y = continue
                else if (currentInput === "Y") {

                    currentInput = "";
                    confirming = false;

                    nextPage();
                }


                // Nothing entered = default YES
                else if (currentInput === "") {

                    confirming = false;

                    nextPage();
                }
            }


            // Anything other than Y/N
            else {

                errorMessage = "Please enter Y or N.";

                showScreen();
            }


            return;
        }


        // =========================================
        // NUMBER INPUT
        // =========================================

        // Accept 0-9
        if (event.key >= "0" && event.key <= "9") {

            currentInput += event.key;

            errorMessage = "";

            showScreen();
        }


        // Backspace
        else if (event.key === "Backspace") {

            currentInput = currentInput.slice(0, -1);

            errorMessage = "";

            showScreen();
        }


        // ENTER submits number
        else if (event.key === "Enter") {

            // Can't submit nothing
            if (currentInput === "") {

                errorMessage = "Please enter a whole number.";

                showScreen();

                return;
            }


            const value = Number(currentInput);


            // -------------------------
            // Question 1: Glasses
            // -------------------------

            if (currentQuestion === 0) {

                glasses = value;

                currentQuestion = 1;
                currentInput = "";
            }


            // -------------------------
            // Question 2: Signs
            // -------------------------

            else if (currentQuestion === 1) {

                signs = value;

                currentQuestion = 2;
                currentInput = "";
            }


            // -------------------------
            // Question 3: Price
            // -------------------------

            else if (currentQuestion === 2) {

                priceInCents = value;

                currentInput = "";

                // Immediately show confirmation
                confirming = true;
            }


            errorMessage = "";

            showScreen();
        }


        // =========================================
        // Invalid number input
        // =========================================

        else {

            errorMessage = "Please enter a whole number only.";

            showScreen();
        }
    });
}