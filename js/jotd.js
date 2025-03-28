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

function unhide_advanced(event) {
    event.preventDefault();

    const checkboxSection = document.querySelector('#api_name');
    
    if (checkboxSection.classList.contains('hide')) {
        checkboxSection.classList.remove('hide')
    } else {
        checkboxSection.classList.add('hide')
        const checkboxes = checkboxSection.querySelectorAll('.search-container input')
        checkboxes.forEach(cb => cb.checked = false)
    }
}
document.querySelector('#advanced').addEventListener('click', unhide_advanced)

function search_query(event) {
    event.preventDefault()

    const form = document.querySelector('.search-container')
    const query = form.search.value.trim()

    const checkedTypes = Array.from(form.querySelectorAll('input[name="drop"]:checked')).map(checkbox => checkbox.value)

    const type = checkedTypes.length > 0 ? checkedTypes.join(',') : "none"

    if (query !== "") {
        const url = `search.html?query=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}`;
        console.log(url);
        window.location.href = url;
    }
}

document.querySelector('.search-container').addEventListener('submit', search_query);
