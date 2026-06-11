// =======================================
// Exercise 1 - JavaScript Basics & Setup
// =======================================

console.log("Welcome to the Community Portal");

window.onload = function () {
    alert("Page Fully Loaded");
};

// =======================================
// Exercise 2 - Syntax, Data Types & Operators
// =======================================

const eventName = "Music Fest";
const eventDate = "2027-01-10";
let seats = 20;

console.log(
`Event: ${eventName}
Date: ${eventDate}
Seats: ${seats}`
);

seats++; // increment seat counter example

// =======================================
// Exercise 5 - Objects & Prototypes
// =======================================

class Event {

    constructor(name, category, location, date, seats) {
        this.name = name;
        this.category = category;
        this.location = location;
        this.date = date;
        this.seats = seats;
    }
}

Event.prototype.checkAvailability = function () {
    return this.seats > 0;
};

let events = [];

// =======================================
// Exercise 4 - Functions, Scope, Closures
// =======================================

function addEvent(event) {
    events.push(event);
}

function registerUser(eventObj) {

    try {

        if (!eventObj) {
            throw new Error("Event Not Found");
        }

        if (eventObj.seats <= 0) {
            throw new Error("No Seats Available");
        }

        eventObj.seats--;

        displayEvents(events);

        alert("Registration Successful");

    } catch (error) {

        console.error(error.message);

        alert(error.message);
    }
}

function filterEventsByCategory(category) {

    return events.filter(
        event => event.category === category
    );
}

// Closure

function registrationCounter() {

    let total = 0;

    return function () {

        total++;

        return total;
    };
}

const countRegistrations = registrationCounter();

// Higher Order Function

function searchEvents(callback) {
    return callback(events);
}

// =======================================
// Exercise 3 - Conditionals, Loops & Error Handling
// =======================================

function displayEvents(list) {

    const container =
        document.querySelector("#eventContainer");

    container.innerHTML = "";

    const today = new Date();

    list.forEach(event => {

        const eventDate =
            new Date(event.date);

        if (
            eventDate >= today &&
            event.seats > 0
        ) {

            let card =
                document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                <h3>${event.name}</h3>

                <p>Category: ${event.category}</p>

                <p>Location: ${event.location}</p>

                <p>Date: ${event.date}</p>

                <p>Seats: ${event.seats}</p>

                <button
                onclick="registerByName('${event.name}')">
                Register
                </button>
            `;

            container.appendChild(card);

        } else {

            console.log(
                "Hidden Event:",
                event.name
            );
        }
    });
}

// =======================================
// Exercise 7 - DOM Manipulation
// =======================================

function registerByName(name) {

    const event =
        events.find(
            e => e.name === name
        );

    registerUser(event);

    console.log(
        "Total Registrations:",
        countRegistrations()
    );
}

// =======================================
// Exercise 8 - Event Handling
// =======================================

document
.getElementById("categoryFilter")
.onchange = function () {

    let category = this.value;

    if (category === "All") {

        displayEvents(events);

    } else {

        displayEvents(
            filterEventsByCategory(category)
        );
    }
};

document
.getElementById("searchBox")
.addEventListener(
"keydown",
function () {

    let keyword =
        this.value.toLowerCase();

    let result =
        events.filter(
            event =>
            event.name
            .toLowerCase()
            .includes(keyword)
        );

    displayEvents(result);
}
);

// =======================================
// Exercise 6 - Arrays & Methods
// =======================================

let sampleEvent =
new Event(
    "Coding Workshop",
    "Workshop",
    "Chennai",
    "2027-04-01",
    30
);

addEvent(sampleEvent);

// push()

events.push(
new Event(
    "Music Show",
    "Music",
    "Chennai",
    "2027-05-10",
    50
)
);

// filter()

console.log(
events.filter(
    event =>
    event.category === "Music"
)
);

// map()

console.log(
events.map(
    event =>
    `Workshop on ${event.name}`
)
);

// Object.entries()

console.log(
Object.entries(sampleEvent)
);

// =======================================
// Exercise 9 - Async JS, Promises,
// Async Await
// =======================================

fetch("events.json")

.then(response =>
response.json()
)

.then(data => {

    data.forEach(item => {

        events.push(

        new Event(
            item.name,
            item.category,
            item.location,
            item.date,
            item.seats
        )

        );

    });

    displayEvents(events);

    document
    .getElementById("loading")
    .style.display = "none";

})

.catch(error => {

    console.error(error);

});

// Async Await Version

async function loadEvents() {

    try {

        const response =
        await fetch("events.json");

        const data =
        await response.json();

        console.log(
        "Loaded Using Async Await",
        data
        );

    }
    catch (error) {

        console.error(error);
    }
}

loadEvents();

// =======================================
// Exercise 10 - Modern JavaScript
// =======================================

const clonedEvents = [...events];

if (clonedEvents.length > 0) {

    const {
        name,
        category
    } = clonedEvents[0];

    console.log(name);
    console.log(category);
}

function greetUser(user = "Guest") {

    console.log(
    `Welcome ${user}`
    );
}

greetUser();

// =======================================
// Exercise 11 - Forms
// =======================================

document
.getElementById("registrationForm")
.addEventListener(
"submit",
function (event) {

    event.preventDefault();

    console.log(
    "===== FORM SUBMISSION ====="
    );

    debugger;

    const form =
    event.target;

    const name =
    form.elements["name"].value;

    const email =
    form.elements["email"].value;

    const selectedEvent =
    form.elements["event"].value;

    if (
        name === "" ||
        email === ""
    ) {

        document
        .getElementById("message")
        .innerHTML =
        "Please fill all fields";

        return;
    }

    document
    .getElementById("message")
    .innerHTML =
    "Registration Successful";

    console.log(
    "Name:",
    name
    );

    console.log(
    "Email:",
    email
    );

    console.log(
    "Event:",
    selectedEvent
    );

    // =======================================
    // Exercise 12 - AJAX & Fetch API
    // =======================================

    const payload = {

        name,
        email,
        selectedEvent
    };

    console.log(
    "Payload Sent:",
    payload
    );

    setTimeout(() => {

        fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {

            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(payload)

        }
        )

        .then(response =>
        response.json()
        )

        .then(data => {

            console.log(
            "POST Success"
            );

            console.log(data);

        })

        .catch(error => {

            console.error(
            "POST Failed",
            error
            );

        });

    }, 2000);

}
);

// =======================================
// Exercise 13 - Debugging & Testing
// =======================================

console.log(
"Debugging Enabled"
);

console.log(
"Check Console Tab"
);

console.log(
"Check Network Tab"
);

// =======================================
// Exercise 14 - jQuery
// =======================================

$("#registerBtn")
.click(function () {

    $("#message")
    .fadeIn();
});

$("#message")
.fadeOut();

// =======================================
// End Of Project
// =======================================