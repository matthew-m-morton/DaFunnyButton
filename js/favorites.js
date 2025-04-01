async function fetch_jokes(url) {
    if (url.includes('icanhazdadjoke')) {
        const res = await fetch(url);
        const html = await res.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const joke = doc.querySelector(".card-content p")?.textContent;

        return joke || "Couldn't extract joke.";
    } else {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
}


function get_jokes(){
    return JSON.parse(window.localStorage.getItem("favorite_urls"))
}


async function display(){
    const jokes = get_jokes()
    jokes.forEach(async (element, index) => {
        const json = await fetch_jokes(element)
        const section = document.createElement('section')
        section.classList.add('joke')
        const h2 = document.createElement('h2')
        h2.textContent = `Joke ${index + 1}`
        section.appendChild(h2)
        if (typeof json === "string"){
            console.log(json)
            const p1 = document.createElement('p')
            p1.textContent = `Joke: ${json}`
            section.appendChild(p1)
            document.querySelector('.output').appendChild(section)
        }else if (json.type){
            if (json.type =="twopart"){
                const p1 = document.createElement('p')
                const p2 = document.createElement('p')
                p1.textContent = `Setup: ${json.setup}`
                p2.textContent = `Delivery: ${json.delivery}`
                section.appendChild(p1)
                section.appendChild(p2)
                document.querySelector('.output').appendChild(section)
            }else{
                const p1 = document.createElement('p')
                p1.textContent = `Joke: ${json.joke}`
                section.appendChild(p1)
                document.querySelector('.output').appendChild(section)
            }
        }else if (json.icon_url){
            const p1 = document.createElement('p')
            p1.textContent = `Joke: ${json.value}`
            section.appendChild(p1)
            document.querySelector('.output').appendChild(section)
        }

        if (document.querySelector('#joke-text')){
            document.querySelector('#joke-text').remove()
        }
        document.querySelector('.output').appendChild(section)
    });
}

display()

document.querySelector('#logo').addEventListener('click', event => window.location.href = 'index.html')