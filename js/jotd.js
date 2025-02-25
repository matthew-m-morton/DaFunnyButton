document.addEventListener("DOMContentLoaded", function() {
    // Declare async function to fetch the joke
    async function fetchJoke() {
        const modal = document.getElementById("joke-modal");
        const closeButton = document.querySelector(".close");
        const jokeText = document.getElementById("joke-text");

        // Fetch the joke from the JokeAPI
        try {
            const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
            const data = await response.json();

            let joke = "";
            if (data.type === "single") {
                joke = data.joke;
            } else if (data.type === "twopart") {
                joke = `${data.setup} - ${data.delivery}`;
            }

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

    // Call the fetchJoke function
    fetchJoke();
});
