function search() {
    const params = new URLSearchParams(window.location.search);

    const query = params.get("query");
    const type = params.get("type");
    const types = type && type.trim() !== "" ? type.split(",") : ["program-joke"];


    types.forEach(type => {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        if (type == "program-joke"){
            h2.textContent = "Programing Jokes"
        }else if (type == "dad-joke"){
            h2.textContent = "Dad Jokes"
        }else{
            h2.textContent = "Chuck Norris Jokes"
        }
        div.appendChild(h2);
        div.classList.add(type);
        document.querySelector('main').appendChild(div);
    });

    types.forEach(t => fetch_api(query, t));
}

addEventListener('DOMContentLoaded', search);

async function fetch_api(query, api) {
    if (api === "program-joke") {
        const website = await fetch(`https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&contains=${query}&amount=10`);
        const response = await website.json();
        const output = document.querySelector('.program-joke');
        const jokes = response.jokes || [response];

        jokes.forEach((object, index) => {
            const section = document.createElement('section');
        
            const count = document.createElement('h3');
            count.textContent = `Joke #${index + 1}`;
            section.appendChild(count);
        
            if (object.type === "twopart") {
                const setup = document.createElement('p');
                setup.textContent = `Setup: ${object.setup}`;
                const delivery = document.createElement('p');
                delivery.textContent = `Delivery: ${object.delivery}`;
                section.appendChild(setup);
                section.appendChild(delivery);
            } else {
                const delivery = document.createElement('p');
                delivery.textContent = `Joke: ${object.joke}`;
                section.appendChild(delivery);
            }
        
            output.appendChild(section);
        });        
    }else if (api == "dad-joke"){
        try {
            const output = document.querySelector('.dad-joke');
            const response = await fetch(`https://icanhazdadjoke.com/search?term=${query}&limit=10`, {
                headers: { 'Accept': 'application/json' }
            });
            const data = await response.json();
            console.log(data)
            data.results.forEach((object, index) => {
                const section = document.createElement('section');
        
                const count = document.createElement('h3');
                count.textContent = `Joke #${index + 1}`;
                section.appendChild(count);
                const delivery = document.createElement('p');
                delivery.textContent = `Joke: ${object.joke}`;
                section.appendChild(delivery);
                output.appendChild(section);
            })
        } catch (error) {
            console.error("Error fetching joke:", error);
        }
    }else{
        const output = document.querySelector('.chuck-joke');
        const website = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
        const response = await website.json();
        console.log(response)
        response.result.slice(0, 10).forEach((object, index) => {
            const section = document.createElement('section');
        
            const count = document.createElement('h3');
            count.textContent = `Joke #${index + 1}`;
            section.appendChild(count);
            const delivery = document.createElement('p');
            delivery.textContent = `Joke: ${object.value}`;
            section.appendChild(delivery);
            output.appendChild(section);
        })
    }
}
