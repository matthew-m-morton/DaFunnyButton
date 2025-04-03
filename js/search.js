function search() {
    const params = new URLSearchParams(window.location.search);

    const query = params.get("query");
    const type = params.get("type");
    const types = type && type.trim() !== "none" ? type.split(",") : ["program-joke"];


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

    if (types.length > 1){
        types.forEach(t => fetch_api(query, t, true));
    }else{
        types.forEach(t => fetch_api(query, t));
    }
}

addEventListener('DOMContentLoaded', search);

async function fetch_api(query, api, multipleCategories = false){
    if (api === "program-joke") {
        const website = await fetch(`https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&contains=${query}&amount=10`);
        const response = await website.json();
        if (response.error !== true){
            const output = document.querySelector('.program-joke');
            const jokes = response.jokes || [response];

            jokes.forEach((object, index) => {
                const section = document.createElement('section');
                const div = document.createElement('div');
                div.classList.add('title')              
                const heart = document.createElement("p");
                heart.textContent = "♥";
                heart.setAttribute("data-url", `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&idRange=${object.id}`);
                heart.classList.add(`joke${index + 1}`)
                div.appendChild(heart)
                // target heart
                const count = document.createElement('h3');
                count.textContent = `Joke #${index + 1}`;
                
                heart.addEventListener('click', event => {
                    event.preventDefault();
                  
                    const url = event.currentTarget.getAttribute("data-url");
                  
                    let favorites = JSON.parse(localStorage.getItem("favorite_urls")) || [];
                  
                    const index = favorites.indexOf(url);
                  
                    if (index !== -1) {
                      favorites.splice(index, 1);
                      console.log(`Removed joke from favorites: ${url}`);
                    } else {
                      favorites.push(url);
                      console.log(`Added joke to favorites: ${url}`);
                    }
                  
                    localStorage.setItem("favorite_urls", JSON.stringify(favorites));
                });
                
                div.appendChild(count)
                section.appendChild(div);
            
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
        }else{
            const output = document.querySelector('.program-joke');
            const error = document.createElement('h1')
            error.textContent = "No Jokes were found"
            output.appendChild(error)
            if (!multipleCategories) {
                setTimeout(() => { window.location.href = "index.html" }, 2000);
            }            
        }  
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
                
                const div = document.createElement('div');
                div.classList.add('title')              
                const heart = document.createElement("p");
                heart.textContent = "♥";
                heart.setAttribute("data-url", `https://icanhazdadjoke.com/j/${object.id}`);
                div.appendChild(heart)

                const count = document.createElement('h3');
                count.classList.add(`joke${index + 1}`)
                count.textContent = `Joke #${index + 1}`;
                
                heart.addEventListener('click', event => {
                    event.preventDefault();
                  
                    const url = event.currentTarget.getAttribute("data-url");
                  
                    let favorites = JSON.parse(localStorage.getItem("favorite_urls")) || [];
                  
                    const index = favorites.indexOf(url);
                  
                    if (index !== -1) {
                      favorites.splice(index, 1);
                      console.log(`Removed joke from favorites: ${url}`);
                    } else {
                      favorites.push(url);
                      console.log(`Added joke to favorites: ${url}`);
                    }
                  
                    localStorage.setItem("favorite_urls", JSON.stringify(favorites));
                });

                div.appendChild(count);
                section.appendChild(div)
                const delivery = document.createElement('p');
                delivery.textContent = `Joke: ${object.joke}`;
                section.appendChild(delivery);
                output.appendChild(section);
            })
        } catch (new_error) {
            const output = document.querySelector('.program-joke');
            const error = document.createElement('h1')
            error.textContent = "No Jokes were found"
            output.appendChild(error)
            if (!multipleCategories) {
                setTimeout(() => { window.location.href = "index.html" }, 2000);
            }
            
        }
    }else{
        const output = document.querySelector('.chuck-joke');
        const website = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
        const response = await website.json();
        if (response.error !== true){
            response.result.slice(0, 10).forEach((object, index) => {
                const section = document.createElement('section');
                const div = document.createElement('div');
                div.classList.add('title')              
                const heart = document.createElement("p");
                heart.textContent = "♥";
                heart.setAttribute("data-url", object.url);
                div.appendChild(heart)

                const count = document.createElement('h3');
                count.classList.add(`joke${index + 1}`)
                count.textContent = `Joke #${index + 1}`;
                
                heart.addEventListener('click', event => {
                    event.preventDefault();
                  
                    const url = event.currentTarget.getAttribute("data-url");
                  
                    let favorites = JSON.parse(localStorage.getItem("favorite_urls")) || [];
                  
                    const index = favorites.indexOf(url);
                  
                    if (index !== -1) {
                      favorites.splice(index, 1);
                      console.log(`Removed joke from favorites: ${url}`);
                    } else {
                      favorites.push(url);
                      console.log(`Added joke to favorites: ${url}`);
                    }
                  
                    localStorage.setItem("favorite_urls", JSON.stringify(favorites));
                  });

                div.appendChild(count);
                section.appendChild(div)
                const delivery = document.createElement('p');
                delivery.textContent = `Joke: ${object.value}`;
                section.appendChild(delivery);
                output.appendChild(section);
            })
        }else{
            const output = document.querySelector('.program-joke');
            const error = document.createElement('h1')
            error.textContent = "No Jokes were found"
            output.appendChild(error)
            if (!multipleCategories) {
                setTimeout(() => { window.location.href = "index.html" }, 2000);
            }            
        }
    }
}

document.querySelector('#logo').addEventListener('click', event => window.location.href = "index.html")