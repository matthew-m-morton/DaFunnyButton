async function getJoke() {
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
        const data = await response.json();

        let joke = "";
        if (data.type === "single") {
            joke = data.joke;
        } else if (data.type === "twopart") {
            joke = `${data.setup} - ${data.delivery}`;
        }

        document.getElementById("jokeContainer").innerText = joke;
    } catch (error) {
        console.error("Error fetching joke:", error);
        document.getElementById("jokeContainer").innerText = "Failed to load a joke. Try again!";
    }
}

document.getElementById("mamabutton").addEventListener("click", () => {getJoke()});