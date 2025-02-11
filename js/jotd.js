document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("joke-modal");
    const closeButton = document.querySelector(".close");
    const jokeText = document.getElementById("joke-text");

    // Example Joke - You can replace this with an API call
    const jokeOfTheDay = "Why don’t skeletons fight each other? They don’t have the guts!";

    jokeText.innerText = jokeOfTheDay;
    
    modal.style.display = "flex";

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    })

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

})