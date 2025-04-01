async function animateVacuumManAndShowJoke(jokeText) {
    const jokeElement = document.getElementById("jokeContainer");
    const vacuumManElement = document.getElementById("vacuum-man");

    vacuumManElement.classList.remove("vacuum-animation");

    void vacuumManElement.offsetHeight;

    // Start joke fade-out and sweeper animation
    jokeElement.classList.add("joke-fade-out");
    vacuumManElement.classList.add("vacuum-animation");

    // Wait for the animation to finish
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show the new joke
    jokeElement.innerText = jokeText;
    jokeElement.classList.remove("joke-fade-out");
    jokeElement.classList.add("joke-fade-in");

    // Reset sweeper for the next run
    setTimeout(() => {
        vacuumManElement.classList.remove("vacuum-animation");
        jokeElement.classList.remove("joke-fade-in");
    }, 3000);
}

// Original Joke Functions (with sweeper logic added)
async function getJoke() {
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
        const data = await response.json();

        let joke = data.type === "single" ? data.joke : `${data.setup} - ${data.delivery}`;
        animateVacuumManAndShowJoke(joke);
    } catch (error) {
        console.error("Error fetching joke:", error);
        animateVacuumManAndShowJoke("Failed to load a joke. Try again!");
    }
}

async function getProgrammingJoke() {
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
        const data = await response.json();

        let joke = data.type === "single" ? data.joke : `${data.setup} - ${data.delivery}`;
        animateVacuumManAndShowJoke(joke);
    } catch (error) {
        console.error("Error fetching joke:", error);
        animateVacuumManAndShowJoke("Failed to load a joke. Try again!");
    }
}

async function getDadJoke() {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        });
        const data = await response.json();
        animateVacuumManAndShowJoke(data.joke);
    } catch (error) {
        console.error("Error fetching joke:", error);
        animateVacuumManAndShowJoke("Failed to load a Dad joke. Try again!");
    }
}

async function getChuckJoke() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        animateVacuumManAndShowJoke(data.value);
    } catch (error) {
        console.error("Error fetching Chuck Norris joke:", error);
        animateVacuumManAndShowJoke("Failed to load a Chuck Norris joke. Try again!");
    }
}

// Button event listeners
document.getElementById("programbutton").addEventListener("click", getProgrammingJoke);
document.querySelector(".dad-joke > button").addEventListener("click", getDadJoke);
document.getElementById("chuckbutton").addEventListener("click", getChuckJoke);

// Modal Joke Logic (Unchanged)
document.addEventListener("DOMContentLoaded", function() {
    async function fetchJoke() {
        const modal = document.getElementById("joke-modal");
        const closeButton = document.querySelector(".close");
        const jokeText = document.getElementById("joke-text");

        try {
            const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
            const data = await response.json();

            let joke = data.type === "single" ? data.joke : `${data.setup} - ${data.delivery}`;
            jokeText.innerText = joke;
        } catch (error) {
            console.error("Error fetching joke:", error);
            jokeText.innerText = "Failed to load a joke. Try again!";
        }

        modal.style.display = "flex";

        closeButton.addEventListener("click", function() {
            modal.style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    fetchJoke();
});