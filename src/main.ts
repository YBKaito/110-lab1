class Student {
    fullName: string;

    constructor(
        public firstName: string,
        public middleInitial: string,
        public lastName: string
    ) {
        this.fullName =
            firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greet(person: Person): string {
    return "Hello, " + person.firstName + " " + person.lastName;
}


// Get app from HTML
const app = document.getElementById("app");


// Store our person
let person: Person = {
    firstName: "",
    lastName: ""
};


// Keep track of screen
let currentScreen = 0;


if (app) {

    // -------------------------
    // Style page
    // -------------------------

    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.backgroundColor = "#eeeeee7d";
    document.body.style.fontFamily = "Arial";


    // -------------------------
    // Style app box
    // -------------------------

    app.style.width = "400px";
    app.style.height = "300px";
    app.style.padding = "40px";
    app.style.backgroundColor = "black";
    app.style.border = "5px solid white";
    app.style.borderRadius = "15px";
    app.style.textAlign = "center";
    app.style.color = "white";


    // -------------------------
    // Show current screen
    // -------------------------

    function showScreen() {

        // SCREEN 0
        if (currentScreen === 0) {

            app!.innerHTML = `
                <h1>Who are you?</h1>

                <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                >

                <br><br>

                <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                >

                <p>Press SPACE to continue</p>
            `;
        }


        // SCREEN 1
        else if (currentScreen === 1) {

            app!.innerHTML = `
                <h1>${greet(person)}</h1>

                <p>Press SPACE to continue</p>
            `;
        }


        // SCREEN 2
        else if (currentScreen === 2) {

            app!.innerHTML = `
                <h1>Welcome to the application!</h1>

                <p>Press SPACE to continue</p>
            `;
        }


        // SCREEN 3
        else if (currentScreen === 3) {

            app!.innerHTML = `
                <h1>You reached the end!</h1>
            `;
        }
    }


    // Show first screen
    showScreen();


    // -------------------------
    // Listen for SPACE
    // -------------------------

    document.addEventListener("keydown", (event) => {

        if (event.code === "Space") {

            // If we're on the name screen
            if (currentScreen === 0) {

                const firstNameInput =
                    document.getElementById("firstName") as HTMLInputElement;

                const lastNameInput =
                    document.getElementById("lastName") as HTMLInputElement;


                person = {
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value
                };
            }


            // Move forward
            if (currentScreen < 3) {
                currentScreen++;
                showScreen();
            }
        }
    });
}